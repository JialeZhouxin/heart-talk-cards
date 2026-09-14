/** Pure import/export helpers (no DOM / localStorage). */

export const SLOT_NAMES = { a: "丈夫", b: "妻子" };

export function emptyPerson(name) {
  return { displayName: name, answers: {}, updatedAt: null };
}

export function emptyFormState() {
  return {
    version: 1,
    people: {
      a: emptyPerson("丈夫"),
      b: emptyPerson("妻子"),
    },
  };
}

export function emptyRoot() {
  return { version: 2, forms: {}, names: { a: "丈夫", b: "妻子" } };
}

/** Root-level display names, so a rename applies to every form at once. */
export function rootNames(root) {
  const n = root?.names;
  if (n?.a || n?.b) return { a: n.a || SLOT_NAMES.a, b: n.b || SLOT_NAMES.b };
  // legacy roots kept the name per form only — infer from whatever is custom
  const out = { a: SLOT_NAMES.a, b: SLOT_NAMES.b };
  for (const st of Object.values(root?.forms || {})) {
    for (const p of ["a", "b"]) {
      const nm = st?.people?.[p]?.displayName;
      const legacy = p === "a" ? "我方" : "对方";
      if (nm && nm !== SLOT_NAMES[p] && nm !== legacy) out[p] = nm;
    }
  }
  return out;
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function personHasAnswers(person) {
  return !!(
    person &&
    person.answers &&
    typeof person.answers === "object" &&
    Object.keys(person.answers).length > 0
  );
}

/** Serialize full multi-form root for "export all". */
export function serializeRoot(root) {
  return JSON.stringify(root, null, 2);
}

/**
 * One-form payload. person = "a"|"b" → 只带该身份一侧，并打上 person 标记；
 * 不带 person（null）→ 双方都带，兼容旧包。
 */
export function oneFormPayload(formId, state, person = null) {
  if (person) {
    return {
      version: 1,
      formId,
      person,
      people: { [person]: state.people[person] },
    };
  }
  return { version: 1, formId, people: state.people };
}

/** Serialize one form for "export one form". */
export function serializeOneForm(formId, state, person = null) {
  return JSON.stringify(oneFormPayload(formId, state, person), null, 2);
}

/** Human label for an import package: which side(s) it covers. */
export function describeImport(parsed) {
  if (parsed?.person) {
    const nm =
      parsed.data?.people?.[parsed.person]?.displayName ||
      SLOT_NAMES[parsed.person];
    return `「${nm}」一侧`;
  }
  return "丈夫 / 妻子两侧";
}

/**
 * Guard against landing someone else's answers on a slot that already has data
 * (e.g. both partners filled the same side). Returns a warning line or null.
 */
export function importConflict(root, parsed, formId = null) {
  if (!parsed?.person) return null;
  const p = parsed.person;
  const incoming = parsed.data?.people?.[p]?.displayName;
  const local = rootNames(root)[p];
  const id = formId || parsed.formId;
  const st = root?.forms?.[id];
  if (!personHasAnswers(st?.people?.[p]) || !incoming || incoming === local) {
    return null;
  }
  return `注意：本机「${local}」侧已有答案，导入包署名是「${incoming}」，很可能是选错了身份，导入后本机这一侧会被整侧覆盖。`;
}

export function parseImport(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("JSON 解析失败，请检查文件内容。");
  }
  if (data?.version === 2 && data.forms && typeof data.forms === "object") {
    return { kind: "root", data };
  }
  if (data?.formId && data?.person && data.people?.[data.person]) {
    return { kind: "form", data, formId: data.formId, person: data.person };
  }
  if (data?.version === 1 && data.people?.a && data.people?.b) {
    return { kind: "legacy_form", data, formId: data.formId || "assessment" };
  }
  if (data?.people?.a && data?.people?.b && data.formId) {
    return { kind: "form", data, formId: data.formId };
  }
  throw new Error("格式不正确：需要 v2 forms 或单表单 people。");
}

function mergePerson(localPerson, importedPerson, fallbackName) {
  if (!personHasAnswers(importedPerson)) {
    return localPerson || emptyPerson(fallbackName);
  }
  return {
    displayName:
      importedPerson.displayName ||
      localPerson?.displayName ||
      fallbackName,
    answers: { ...importedPerson.answers },
    updatedAt: importedPerson.updatedAt || new Date().toISOString(),
  };
}

function replacePerson(importedPerson, fallbackName) {
  return {
    displayName: importedPerson?.displayName || fallbackName,
    answers: { ...(importedPerson?.answers || {}) },
    updatedAt: importedPerson?.updatedAt || null,
  };
}

function mergeFormState(localForm, importedForm, mode) {
  const base = localForm ? clone(localForm) : emptyFormState();
  if (!importedForm?.people) return base;
  const out = {
    version: 1,
    people: {
      a: base.people?.a || emptyPerson("丈夫"),
      b: base.people?.b || emptyPerson("妻子"),
    },
  };
  if (mode === "replace") {
    out.people.a = replacePerson(importedForm.people.a, "丈夫");
    out.people.b = replacePerson(importedForm.people.b, "妻子");
    return out;
  }
  // merge (default): only non-empty imported person overwrites that side
  out.people.a = mergePerson(out.people.a, importedForm.people.a, "丈夫");
  out.people.b = mergePerson(out.people.b, importedForm.people.b, "妻子");
  return out;
}

/**
 * Apply import package onto local root.
 * @param {'merge'|'replace'} mode merge = dual-phone safe (default)
 */
export function applyImport(root, parsed, formIdFilter = null, mode = "merge") {
  const next = clone(root || emptyRoot());
  if (!next.forms) next.forms = {};

  if (parsed.kind === "root") {
    const ids = Object.keys(parsed.data.forms || {});
    const use = formIdFilter ? ids.filter((id) => id === formIdFilter) : ids;
    if (!use.length) throw new Error("导入包中没有可覆盖的表单。");
    for (const id of use) {
      next.forms[id] = mergeFormState(
        next.forms[id],
        parsed.data.forms[id],
        mode
      );
    }
    // 称呼随包带走，否则对方机器上仍显示「丈夫/妻子」
    const incoming = parsed.data.names;
    if (incoming?.a || incoming?.b) {
      next.names = { ...rootNames(next), ...incoming };
      for (const id of use) {
        for (const p of ["a", "b"]) {
          if (incoming[p]) next.forms[id].people[p].displayName = incoming[p];
        }
      }
    }
    return { root: next, forms: use };
  }

  const fid = formIdFilter || parsed.formId || "assessment";

  // 单人包：只写标记的那一侧，另一侧原样保留（replace 模式也不动）
  if (parsed.person) {
    const p = parsed.person;
    const base = next.forms[fid] ? clone(next.forms[fid]) : emptyFormState();
    base.people[p] =
      mode === "replace"
        ? replacePerson(parsed.data.people[p], SLOT_NAMES[p])
        : mergePerson(base.people?.[p], parsed.data.people[p], SLOT_NAMES[p]);
    next.forms[fid] = base;
    const nm = base.people[p].displayName;
    if (nm) next.names = { ...rootNames(next), [p]: nm };
    return { root: next, forms: [fid] };
  }

  next.forms[fid] = mergeFormState(
    next.forms[fid],
    { people: parsed.data.people },
    mode
  );
  return { root: next, forms: [fid] };
}

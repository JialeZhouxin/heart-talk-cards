/** Pure import/export helpers (no DOM / localStorage). */

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
  return { version: 2, forms: {} };
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

/** Serialize one form for "export one form". */
export function serializeOneForm(formId, state) {
  return JSON.stringify(
    { version: 1, formId, people: state.people },
    null,
    2
  );
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
    return { root: next, forms: use };
  }

  const fid = formIdFilter || parsed.formId || "assessment";
  next.forms[fid] = mergeFormState(
    next.forms[fid],
    { people: parsed.data.people },
    mode
  );
  return { root: next, forms: [fid] };
}

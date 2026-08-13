/** Per-form localStorage answers. Migrates legacy single-form key. */

import {
  applyImport as applyImportCore,
  clone,
  emptyFormState,
  emptyPerson,
  emptyRoot,
  parseImport as parseImportCore,
  personHasAnswers,
  serializeOneForm,
  serializeRoot,
} from "./import-export-core.js";

export const ROOT_KEY = "premarital.forms.v2";
export const LEGACY_KEY = "premarital.assessment.v1";

export {
  emptyFormState,
  emptyPerson,
  emptyRoot,
  personHasAnswers,
  serializeOneForm,
  serializeRoot,
};

let memoryFallback = null;
let storageWarned = false;

function normalizePersonName(person, name) {
  if (person === "a" && (!name || name === "我方")) return "丈夫";
  if (person === "b" && (!name || name === "对方")) return "妻子";
  return name || (person === "a" ? "丈夫" : "妻子");
}

function readRaw(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key, value) {
  localStorage.setItem(key, value);
}

export function loadRoot() {
  if (memoryFallback) return clone(memoryFallback);
  try {
    const raw = readRaw(ROOT_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data?.version === 2 && data.forms && typeof data.forms === "object") {
        return data;
      }
    }
    const legacy = readRaw(LEGACY_KEY);
    if (legacy) {
      const old = JSON.parse(legacy);
      if (old?.version === 1 && old.people?.a && old.people?.b) {
        const root = emptyRoot();
        root.forms.assessment = {
          version: 1,
          people: {
            a: {
              displayName: old.people.a.displayName || "丈夫",
              answers: { ...(old.people.a.answers || {}) },
              updatedAt: old.people.a.updatedAt || null,
            },
            b: {
              displayName: old.people.b.displayName || "妻子",
              answers: { ...(old.people.b.answers || {}) },
              updatedAt: old.people.b.updatedAt || null,
            },
          },
        };
        saveRoot(root);
        return root;
      }
    }
    return emptyRoot();
  } catch {
    return emptyRoot();
  }
}

export function saveRoot(root) {
  // ponytail: 满盘时以导出为唯一持久化
  memoryFallback = clone(root);
  try {
    writeRaw(ROOT_KEY, JSON.stringify(root));
    memoryFallback = null;
    return { ok: true };
  } catch (e) {
    if (!storageWarned) {
      storageWarned = true;
      console.warn("localStorage unavailable", e);
    }
    return {
      ok: false,
      message: "本地存储不可用或已满，请立刻导出 JSON 备份，否则关闭页面会丢失。",
    };
  }
}

export function loadState(formId) {
  const root = loadRoot();
  if (!root.forms[formId]) {
    root.forms[formId] = emptyFormState();
  }
  const st = root.forms[formId];
  for (const p of ["a", "b"]) {
    if (!st.people[p]) st.people[p] = emptyPerson(p === "a" ? "丈夫" : "妻子");
    if (!st.people[p].answers || typeof st.people[p].answers !== "object") {
      st.people[p].answers = {};
    }
    st.people[p].displayName = normalizePersonName(p, st.people[p].displayName);
  }
  return clone(st);
}

export function saveState(formId, state) {
  const root = loadRoot();
  root.forms[formId] = clone(state);
  return saveRoot(root);
}

export function setAnswer(state, person, itemId, value, type) {
  const p = state.people[person];
  if (!p) return state;
  if (type === "likert" || type === "choice") {
    const n = Number(value);
    if (!Number.isInteger(n) || n < 1 || n > 5) {
      if (!Number.isInteger(n) || n < 1) delete p.answers[itemId];
      else p.answers[itemId] = n;
    } else {
      p.answers[itemId] = n;
    }
  } else {
    const s = value == null ? "" : String(value).trim();
    if (!s) delete p.answers[itemId];
    else p.answers[itemId] = s;
  }
  p.updatedAt = new Date().toISOString();
  return state;
}

function isDone(it, v) {
  if (it.type === "likert" || it.type === "choice") {
    return Number.isInteger(v) && v >= 1 && v <= 5;
  }
  return typeof v === "string" && v.trim().length > 0;
}

export function progress(state, bank) {
  let total = 0;
  for (const ch of bank.chapters) total += ch.items.length;
  const one = (person) => {
    const ans = state.people[person].answers || {};
    let done = 0;
    let likertTotal = 0;
    let likertDone = 0;
    let openTotal = 0;
    let openDone = 0;
    let choiceTotal = 0;
    let choiceDone = 0;
    for (const ch of bank.chapters) {
      for (const it of ch.items) {
        const v = ans[it.id];
        if (it.type === "likert") {
          likertTotal++;
          if (isDone(it, v)) {
            likertDone++;
            done++;
          }
        } else if (it.type === "choice") {
          choiceTotal++;
          if (isDone(it, v)) {
            choiceDone++;
            done++;
          }
        } else {
          openTotal++;
          if (isDone(it, v)) {
            openDone++;
            done++;
          }
        }
      }
    }
    return {
      done,
      total,
      likertDone,
      likertTotal,
      openDone,
      openTotal,
      choiceDone,
      choiceTotal,
    };
  };
  return { a: one("a"), b: one("b") };
}

export function exportJSON(rootOrState, filename = "premarital-forms.json") {
  const blob = new Blob([JSON.stringify(rootOrState, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function parseImport(text) {
  return parseImportCore(text);
}

/** Default mode=merge：双机各自填写后合并，空身份不覆盖本地。 */
export function applyImport(root, parsed, formIdFilter = null, mode = "merge") {
  return applyImportCore(root, parsed, formIdFilter, mode);
}

export function getAnswer(state, person, itemId) {
  return state.people[person]?.answers?.[itemId];
}

export function exportOneForm(formId, state) {
  exportJSON(
    { version: 1, formId, people: state.people },
    `premarital-${formId}.json`
  );
}

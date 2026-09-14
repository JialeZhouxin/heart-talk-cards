/** Per-form localStorage answers. Migrates legacy single-form key.
 *
 * Pure form-state logic (setAnswer / getAnswer / progress / exportJSON /
 * exportOneForm) lives in ./form-logic.js — testable without storage.
 * This module re-exports them for backward compatibility, but new code
 * should import from form-logic directly.
 */

import {
  applyImport as applyImportCore,
  clone,
  describeImport,
  emptyFormState,
  emptyPerson,
  emptyRoot,
  importConflict,
  parseImport as parseImportCore,
  personHasAnswers,
  rootNames,
  serializeRoot,
  SLOT_NAMES,
} from "./import-export-core.js";
import {
  exportJSON,
  exportOneForm,
  getAnswer,
  progress,
  serializeOneForm,
  setAnswer,
} from "./form-logic.js";

export const ROOT_KEY = "premarital.forms.v2";
export const LEGACY_KEY = "premarital.assessment.v1";

export {
  describeImport,
  emptyFormState,
  emptyPerson,
  emptyRoot,
  exportJSON,
  exportOneForm,
  getAnswer,
  importConflict,
  personHasAnswers,
  progress,
  rootNames,
  serializeOneForm,
  serializeRoot,
  setAnswer,
  SLOT_NAMES,
};

let memoryFallback = null;
let storageWarned = false;

function normalizePersonName(person, name) {
  if (person === "a" && !name) return "丈夫";
  if (person === "b" && !name) return "妻子";
  return name;
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
        data.names = rootNames(data);
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
  const names = rootNames(root);
  const st = root.forms[formId];
  for (const p of ["a", "b"]) {
    if (!st.people[p]) st.people[p] = emptyPerson(names[p]);
    if (!st.people[p].answers || typeof st.people[p].answers !== "object") {
      st.people[p].answers = {};
    }
    // root.names is authoritative; per-form names are only a legacy mirror
    st.people[p].displayName = normalizePersonName(p, names[p]);
  }
  return clone(st);
}

export function saveState(formId, state) {
  const root = loadRoot();
  root.forms[formId] = clone(state);
  return saveRoot(root);
}

/** Set a person's display name for the whole app (stored on the root, mirrored per form). */
export function setPersonName(person, name) {
  const root = loadRoot();
  const clean = String(name || "").trim().slice(0, 20) || SLOT_NAMES[person];
  root.names = { ...rootNames(root), [person]: clean };
  for (const st of Object.values(root.forms)) {
    if (!st.people) st.people = {};
    if (!st.people[person]) st.people[person] = emptyPerson(clean);
    st.people[person].displayName = clean;
  }
  const r = saveRoot(root);
  return r.ok ? { ok: true, name: clean } : r;
}

export function parseImport(text) {
  return parseImportCore(text);
}

/** Default mode=merge：双机各自填写后合并，空身份不覆盖本地。 */
export function applyImport(root, parsed, formIdFilter = null, mode = "merge") {
  return applyImportCore(root, parsed, formIdFilter, mode);
}

/** Pure form-state logic: no DOM, no localStorage. Safe to unit-test. */

import {
  serializeOneForm,
} from "./import-export-core.js";

/** Is `v` a valid completed answer for item `it`? */
export function isAnswered(it, v) {
  if (it.type === "likert" || it.type === "choice") {
    return Number.isInteger(v) && v >= 1 && v <= 5;
  }
  return typeof v === "string" && v.trim().length > 0;
}

/** True when `v` is a valid likert/choice scale value (1..5). */
export function isScaleValue(v) {
  return Number.isInteger(v) && v >= 1 && v <= 5;
}

/** Read one answer from a form state. */
export function getAnswer(state, person, itemId) {
  return state.people[person]?.answers?.[itemId];
}

/** Mutate-and-return `state`: set / clear one answer with validation. */
export function setAnswer(state, person, itemId, value, type) {
  const p = state.people[person];
  if (!p) return state;
  if (type === "likert" || type === "choice") {
    const n = Number(value);
    if (isScaleValue(n)) {
      p.answers[itemId] = n;
    } else if (!Number.isInteger(n) || n < 1) {
      delete p.answers[itemId];
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

/** Per-person + combined progress across a form bank. */
export function progress(state, bank) {
  let total = 0;
  for (const ch of bank.chapters) total += ch.items.length;
  const one = (person) => {
    const ans = state.people[person].answers || {};
    let done = 0;
    let likertTotal = 0, likertDone = 0;
    let openTotal = 0, openDone = 0;
    let choiceTotal = 0, choiceDone = 0;
    for (const ch of bank.chapters) {
      for (const it of ch.items) {
        const v = ans[it.id];
        if (it.type === "likert") {
          likertTotal++;
          if (isAnswered(it, v)) { likertDone++; done++; }
        } else if (it.type === "choice") {
          choiceTotal++;
          if (isAnswered(it, v)) { choiceDone++; done++; }
        } else {
          openTotal++;
          if (isAnswered(it, v)) { openDone++; done++; }
        }
      }
    }
    return {
      done, total,
      likertDone, likertTotal,
      openDone, openTotal,
      choiceDone, choiceTotal,
    };
  };
  return { a: one("a"), b: one("b") };
}

/** Download a JSON blob (DOM side-effect, but pure w.r.t. app state). */
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

/** Export one form as a standalone JSON file. */
export function exportOneForm(formId, state) {
  exportJSON(
    { version: 1, formId, people: state.people },
    `premarital-${formId}.json`
  );
}

// re-export for callers that used to import this from storage.js
export { serializeOneForm };

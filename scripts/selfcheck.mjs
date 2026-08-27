// selfcheck for premarital pure modules — run: node scripts/selfcheck.mjs
import { diffLikert, summarize } from "../premarital/js/compare.js";
import {
  getAnswer,
  isAnswered,
  isScaleValue,
  progress,
  setAnswer,
} from "../premarital/js/form-logic.js";
import assert from "node:assert/strict";

// ---- compare.js ----
assert.equal(diffLikert(1, 1), "match");
assert.equal(diffLikert(1, 2), "near");
assert.equal(diffLikert(1, 4), "far");
assert.equal(diffLikert(null, 1), "missing");
assert.deepEqual(summarize([{ a: 1, b: 1 }, { a: 1, b: 3 }]), {
  match: 1, near: 0, far: 1, missing: 0,
});

// ---- form-logic.js ----
let state = {
  people: {
    a: { displayName: "丈夫", answers: {}, updatedAt: null },
    b: { displayName: "妻子", answers: {}, updatedAt: null },
  },
};
const bank = {
  chapters: [{
    title: "ch1",
    items: [
      { id: "q1", type: "likert", prompt: "x" },
      { id: "q2", type: "choice", prompt: "y" },
      { id: "q3", type: "open", prompt: "z" },
    ],
  }],
};

setAnswer(state, "a", "q1", "4", "likert");
assert.equal(getAnswer(state, "a", "q1"), 4);
setAnswer(state, "a", "q1", "0", "likert");
assert.equal(getAnswer(state, "a", "q1"), undefined);
setAnswer(state, "a", "q2", 5, "choice");
assert.equal(getAnswer(state, "a", "q2"), 5);
setAnswer(state, "a", "q3", "  ", "open");
assert.equal(getAnswer(state, "a", "q3"), undefined);
setAnswer(state, "a", "q3", "hello", "open");
assert.equal(getAnswer(state, "a", "q3"), "hello");

const p = progress(state, bank);
assert.equal(p.a.done, 2);
assert.equal(p.a.choiceDone, 1);
assert.equal(p.a.openDone, 1);
assert.equal(p.a.likertDone, 0);
assert.equal(p.a.likertTotal, 1);
assert.equal(p.a.total, 3);
assert.equal(p.b.done, 0);

assert.equal(isAnswered({ type: "likert" }, 3), true);
assert.equal(isAnswered({ type: "likert" }, 6), false);
assert.equal(isAnswered({ type: "open" }, ""), false);
assert.ok(isScaleValue(1) && isScaleValue(5));
assert.ok(!isScaleValue(0) && !isScaleValue(6));

console.log("selfcheck ok: compare.js + form-logic.js 全部断言通过");

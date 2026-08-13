import { diffLikert, summarize } from "./compare.js";

console.assert(diffLikert(1, 1) === "match", "match");
console.assert(diffLikert(1, 2) === "near", "near");
console.assert(diffLikert(1, 4) === "far", "far");
console.assert(diffLikert(null, 1) === "missing", "missing");
console.log("selfcheck ok", summarize([{ a: 1, b: 1 }, { a: 1, b: 3 }]));

/** Likert compare helpers (pure). */

export function diffLikert(a, b) {
  if (a == null || b == null) return "missing";
  const na = Number(a);
  const nb = Number(b);
  if (!Number.isFinite(na) || !Number.isFinite(nb)) return "missing";
  const d = Math.abs(na - nb);
  if (d === 0) return "match";
  if (d === 1) return "near";
  return "far";
}

export function summarize(pairs) {
  const s = { match: 0, near: 0, far: 0, missing: 0 };
  for (const { a, b } of pairs) {
    s[diffLikert(a, b)]++;
  }
  return s;
}

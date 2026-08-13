/**
 * Core tests: export all / import all, dual-phone merge.
 * Run: node scripts/test_import_export.mjs
 */
import {
  applyImport,
  emptyFormState,
  emptyRoot,
  parseImport,
  personHasAnswers,
  serializeOneForm,
  serializeRoot,
} from "../js/import-export-core.js";

let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    failed++;
    console.error("FAIL:", msg);
    throw new Error(msg);
  }
  passed++;
  console.log("OK:", msg);
}

function makePerson(name, answers) {
  return {
    displayName: name,
    answers: { ...answers },
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function makeForm(aAnswers, bAnswers) {
  const st = emptyFormState();
  st.people.a = makePerson("丈夫", aAnswers);
  st.people.b = makePerson("妻子", bAnswers);
  return st;
}

// --- 1. export all round-trip ---
{
  const root = emptyRoot();
  root.forms.assessment = makeForm({ q1: 1, q2: 2 }, { q1: 5 });
  root.forms.roles = makeForm({ r1: 3 }, {});
  const text = serializeRoot(root);
  const parsed = parseImport(text);
  assert(parsed.kind === "root", "export all parses as root");
  const { root: back, forms } = applyImport(emptyRoot(), parsed, null, "replace");
  assert(forms.includes("assessment") && forms.includes("roles"), "import all forms list");
  assert(back.forms.assessment.people.a.answers.q1 === 1, "round-trip husband score");
  assert(back.forms.assessment.people.b.answers.q1 === 5, "round-trip wife score");
  assert(back.forms.roles.people.a.answers.r1 === 3, "round-trip second form");
}

// --- 2. dual-phone: husband fills a, wife fills b, merge both ways ---
{
  // husband's phone
  const husbandPhone = emptyRoot();
  husbandPhone.forms.assessment = makeForm({ q1: 1, q2: 2 }, {}); // wife empty

  // wife's phone
  const wifePhone = emptyRoot();
  wifePhone.forms.assessment = makeForm({}, { q1: 4, q2: 5 }); // husband empty

  // wife exports all → husband imports (merge)
  const wifeExport = serializeRoot(wifePhone);
  const parsedWife = parseImport(wifeExport);
  const { root: onHusband } = applyImport(husbandPhone, parsedWife, null, "merge");
  assert(
    onHusband.forms.assessment.people.a.answers.q1 === 1,
    "merge keeps husband answers after importing wife package"
  );
  assert(
    onHusband.forms.assessment.people.a.answers.q2 === 2,
    "merge keeps husband q2"
  );
  assert(
    onHusband.forms.assessment.people.b.answers.q1 === 4,
    "merge takes wife answers from import"
  );
  assert(
    onHusband.forms.assessment.people.b.answers.q2 === 5,
    "merge takes wife q2"
  );

  // reverse: husband export → wife import merge
  const husbandExport = serializeRoot(husbandPhone);
  const { root: onWife } = applyImport(
    wifePhone,
    parseImport(husbandExport),
    null,
    "merge"
  );
  assert(onWife.forms.assessment.people.b.answers.q1 === 4, "wife keeps own after husband import");
  assert(onWife.forms.assessment.people.a.answers.q1 === 1, "wife gets husband answers");
}

// --- 3. replace mode WOULD wipe the other side (documented) ---
{
  const husbandPhone = emptyRoot();
  husbandPhone.forms.assessment = makeForm({ q1: 1 }, {});
  const wifeExport = serializeRoot({
    version: 2,
    forms: { assessment: makeForm({}, { q1: 5 }) },
  });
  const { root: wiped } = applyImport(
    husbandPhone,
    parseImport(wifeExport),
    null,
    "replace"
  );
  assert(
    !personHasAnswers(wiped.forms.assessment.people.a),
    "replace mode overwrites husband with empty from wife export"
  );
  assert(wiped.forms.assessment.people.b.answers.q1 === 5, "replace takes wife");
}

// --- 4. single form export / import merge ---
{
  const local = emptyRoot();
  local.forms.roles = makeForm({ r1: 1 }, { r1: 2 });
  const one = serializeOneForm("roles", makeForm({ r1: 9 }, {}));
  const parsed = parseImport(one);
  assert(parsed.kind === "form" || parsed.kind === "legacy_form", "one form parse");
  const { root, forms } = applyImport(local, parsed, "roles", "merge");
  assert(forms[0] === "roles", "single form id");
  assert(root.forms.roles.people.a.answers.r1 === 9, "single merge updates husband");
  assert(root.forms.roles.people.b.answers.r1 === 2, "single merge keeps local wife");
}

// --- 5. form filter on full package ---
{
  const local = emptyRoot();
  local.forms.assessment = makeForm({ q1: 1 }, { q1: 1 });
  local.forms.roles = makeForm({ r1: 1 }, { r1: 1 });
  const pack = serializeRoot({
    version: 2,
    forms: {
      assessment: makeForm({ q1: 7 }, { q1: 8 }),
      roles: makeForm({ r1: 9 }, { r1: 9 }),
    },
  });
  const { root } = applyImport(local, parseImport(pack), "assessment", "merge");
  assert(root.forms.assessment.people.a.answers.q1 === 7, "filter updates assessment");
  assert(root.forms.roles.people.a.answers.r1 === 1, "filter leaves roles alone");
}

// --- 6. bad JSON ---
{
  let threw = false;
  try {
    parseImport("{not json");
  } catch {
    threw = true;
  }
  assert(threw, "bad JSON throws");
}

// --- 7. multi-form dual phone full package ---
{
  const hus = emptyRoot();
  hus.forms.assessment = makeForm({ a1: 1 }, {});
  hus.forms.sex = makeForm({ s1: 2 }, {});
  const wife = emptyRoot();
  wife.forms.assessment = makeForm({}, { a1: 3 });
  wife.forms.sex = makeForm({}, { s1: 1 });
  const merged = applyImport(hus, parseImport(serializeRoot(wife)), null, "merge").root;
  assert(merged.forms.assessment.people.a.answers.a1 === 1, "multi form husband keep assessment");
  assert(merged.forms.assessment.people.b.answers.a1 === 3, "multi form wife merge assessment");
  assert(merged.forms.sex.people.a.answers.s1 === 2, "multi form husband keep sex");
  assert(merged.forms.sex.people.b.answers.s1 === 1, "multi form wife merge sex");
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
console.log("ALL IMPORT/EXPORT TESTS PASSED");

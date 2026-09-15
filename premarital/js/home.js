import {
  applyImport,
  describeImport,
  importConflict,
  loadRoot,
  loadState,
  parseImport,
  saveRoot,
  setPersonName,
} from "./storage.js";
import {
  exportJSON,
  exportOneForm,
  progress,
} from "./form-logic.js";
import { loadBankByFile, loadCatalog, offlineHref, rewireHomeLinks, isOfflinePack } from "./data-loader.js";

function pageRoot() {
  if (typeof isOfflinePack === "function" && isOfflinePack()) {
    if (location.hash.startsWith("#/fill")) return document.getElementById("view-fill") || document;
    if (location.hash.startsWith("#/compare")) return document.getElementById("view-compare") || document;
    return document.getElementById("view-home") || document;
  }
  return document;
}
const $ = (id) => {
  const root = pageRoot();
  return (root.querySelector && root.querySelector("#" + id)) || document.getElementById(id);
};

function showError(msg) {
  const el = $("error");
  if (!msg) {
    el.hidden = true;
    el.textContent = "";
    return;
  }
  el.hidden = false;
  el.textContent = msg;
}

function fmtProg(p) {
  const parts = [];
  if (p.likertTotal) parts.push(`量表 ${p.likertDone}/${p.likertTotal}`);
  if (p.choiceTotal) parts.push(`选择 ${p.choiceDone}/${p.choiceTotal}`);
  if (p.openTotal) parts.push(`开放 ${p.openDone}/${p.openTotal}`);
  if (!parts.length) parts.push(`已填 ${p.done}/${p.total}`);
  return parts.join(" · ");
}

async function loadBank(file) {
  return loadBankByFile(file);
}

async function importInto(formId, file, title) {
  const text = await file.text();
  const parsed = parseImport(text);
  const label = title || formId;
  const side = describeImport(parsed);
  const warn = importConflict(loadRoot(), parsed, formId);
  if (
    !confirm(
      `该文件包含${side}答案，将覆盖本地同一身份，确认导入到「${label}」？` +
        (warn ? `\n\n${warn}` : "")
    )
  )
    return false;
  const { root, forms } = applyImport(loadRoot(), parsed, formId);
  const r = saveRoot(root);
  if (!r.ok) {
    showError(r.message);
    return false;
  }
  if (parsed.person) {
    const nm = parsed.data?.people?.[parsed.person]?.displayName;
    if (nm) setPersonName(parsed.person, nm);
  }
  showError("");
  alert(`已导入到：${forms.join(", ") || formId}`);
  return true;
}

async function main() {
  rewireHomeLinks();
  let catalog;
  try {
    catalog = await loadCatalog();
  } catch {
    showError("表单目录加载失败。网页版请用本地服务器打开 web/；或使用离线单文件包。");
    return;
  }

  const list = $("form-list");
  list.innerHTML = "";

  const nameBox = $("names");
  const saved = loadState(catalog.forms[0].id).people;
  nameBox.innerHTML = `
    <span class="muted">称呼：</span>
    <label class="muted"><input id="name-a" type="text" maxlength="20" style="width:9em" value="${saved.a.displayName || "丈夫"}" /> 丈夫侧</label>
    <label class="muted"><input id="name-b" type="text" maxlength="20" style="width:9em" value="${saved.b.displayName || "妻子"}" /> 妻子侧</label>
    <button class="btn" id="btn-save-names" type="button">保存称呼</button>
    <span class="muted">（用于导出文件名与打印抬头，两边可各填各的）</span>
  `;
  $("btn-save-names").addEventListener("click", () => {
    const a = $("name-a").value;
    const b = $("name-b").value;
    const ra = setPersonName("a", a);
    const rb = setPersonName("b", b);
    if (!ra.ok) showError(ra.message);
    else if (!rb.ok) showError(rb.message);
    else {
      showError("");
      location.reload();
    }
  });

  for (const form of catalog.forms) {
    let bank;
    try {
      bank = await loadBank(form.file);
    } catch {
      bank = { chapters: [] };
    }
    const state = loadState(form.id);
    const prog = progress(state, bank);
    const nameA = state.people.a.displayName || "丈夫";
    const nameB = state.people.b.displayName || "妻子";
    const importId = `import-${form.id}`;

    const card = document.createElement("div");
    card.className = "card form-card";
    card.innerHTML = `
      <div class="row" style="justify-content:space-between;align-items:flex-start">
        <div>
          <h2 style="margin:0 0 4px">${form.title}</h2>
          <p class="muted" style="margin:0">${form.desc || ""}</p>
        </div>
        <span class="pill">${form.short || form.id}</span>
      </div>
      <p class="progress" style="margin:12px 0 6px">${nameA}：${fmtProg(prog.a)}</p>
      <p class="progress" style="margin:0 0 12px">${nameB}：${fmtProg(prog.b)}</p>
      <div class="actions">
        <div class="actions-main">
          <a class="btn primary" href="${offlineHref("fill", { form: form.id, person: "a" })}">填 · ${nameA}</a>
          <a class="btn primary" href="${offlineHref("fill", { form: form.id, person: "b" })}">填 · ${nameB}</a>
          ${
            form.compare
              ? `<a class="btn" href="${offlineHref("compare", { form: form.id })}">对照</a>`
              : ""
          }
        </div>
        <div class="actions-tools">
          <button class="btn ghost" type="button" data-export="${form.id}">导出本表</button>
          <label class="btn ghost" for="${importId}">导入本表</label>
          <input id="${importId}" type="file" accept="application/json,.json" hidden data-form="${form.id}" data-title="${form.title}" />
        </div>
      </div>
    `;
    list.appendChild(card);

    card.querySelector(`[data-export="${form.id}"]`).addEventListener("click", () => {
      exportOneForm(form.id, loadState(form.id), "both");
    });
    card.querySelector(`#${importId}`).addEventListener("change", async (ev) => {
      const file = ev.target.files?.[0];
      ev.target.value = "";
      if (!file) return;
      try {
        const ok = await importInto(form.id, file, form.title);
        if (ok) location.reload();
      } catch (e) {
        showError(e.message || String(e));
      }
    });
  }

  $("btn-export").addEventListener("click", () => {
    exportJSON(loadRoot(), "premarital-forms-all.json");
  });

  $("file-import").addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseImport(text);
      const warn = importConflict(loadRoot(), parsed);
      const label =
        parsed.kind === "root"
          ? "全部导入包中的表单"
          : `表单 ${parsed.formId || "assessment"}（${describeImport(parsed)}）`;
      if (!confirm(`将覆盖本地「${label}」答案，确认？` + (warn ? `\n\n${warn}` : ""))) return;
      const { root, forms } = applyImport(loadRoot(), parsed);
      const r = saveRoot(root);
      if (!r.ok) showError(r.message);
      else showError("");
      alert(`导入完成：${forms.join(", ")}`);
      location.reload();
    } catch (e) {
      showError(e.message || String(e));
    }
  });
}

main();

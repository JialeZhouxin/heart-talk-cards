import {
  applyImport,
  exportJSON,
  exportOneForm,
  loadRoot,
  loadState,
  parseImport,
  progress,
  saveRoot,
} from "./storage.js";
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
  if (!confirm(`将覆盖「${label}」的丈夫/妻子全部答案，确认？`)) return false;
  const { root, forms } = applyImport(loadRoot(), parsed, formId);
  const r = saveRoot(root);
  if (!r.ok) {
    showError(r.message);
    return false;
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

  for (const form of catalog.forms) {
    let bank;
    try {
      bank = await loadBank(form.file);
    } catch {
      bank = { chapters: [] };
    }
    const state = loadState(form.id);
    const prog = progress(state, bank);
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
      <p class="progress" style="margin:12px 0 6px">丈夫：${fmtProg(prog.a)}</p>
      <p class="progress" style="margin:0 0 12px">妻子：${fmtProg(prog.b)}</p>
      <div class="row">
        <a class="btn primary" href="${offlineHref("fill", { form: form.id, person: "a" })}">填 · 丈夫</a>
        <a class="btn primary" href="${offlineHref("fill", { form: form.id, person: "b" })}">填 · 妻子</a>
        ${
          form.compare
            ? `<a class="btn" href="${offlineHref("compare", { form: form.id })}">对照</a>`
            : ""
        }
        <button class="btn" type="button" data-export="${form.id}">导出本表</button>
        <label class="btn" for="${importId}">导入本表</label>
        <input id="${importId}" type="file" accept="application/json,.json" hidden data-form="${form.id}" data-title="${form.title}" />
      </div>
    `;
    list.appendChild(card);

    card.querySelector(`[data-export="${form.id}"]`).addEventListener("click", () => {
      exportOneForm(form.id, loadState(form.id));
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
      const label =
        parsed.kind === "root"
          ? "全部导入包中的表单"
          : `表单 ${parsed.formId || "assessment"}`;
      if (!confirm(`将覆盖本地「${label}」答案，确认？`)) return;
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

/** Load form catalog / banks from embed pack or network. */

export function isOfflinePack() {
  return !!(typeof window !== "undefined" && window.__EMBED__ && window.__EMBED__.catalog);
}

export function offlineHref(page, params = {}) {
  const q = new URLSearchParams(params).toString();
  if (isOfflinePack()) {
    if (page === "index" || page === "home") return "#/";
    if (page === "fill") return `#/fill${q ? `?${q}` : ""}`;
    if (page === "compare") return `#/compare${q ? `?${q}` : ""}`;
  }
  if (page === "index" || page === "home") return "index.html";
  if (page === "fill") return `fill.html${q ? `?${q}` : ""}`;
  if (page === "compare") return `compare.html${q ? `?${q}` : ""}`;
  return page;
}

export async function loadCatalog() {
  if (isOfflinePack()) return window.__EMBED__.catalog;
  const res = await fetch("data/forms.json");
  if (!res.ok) throw new Error("forms.json");
  return res.json();
}

export async function loadBankByFile(file) {
  if (isOfflinePack()) {
    const banks = window.__EMBED__.banks || {};
    // file like "forms/assessment.json"
    if (banks[file]) return banks[file];
    const base = file.split("/").pop();
    if (banks[base]) return banks[base];
    if (banks[`forms/${base}`]) return banks[`forms/${base}`];
    throw new Error(file);
  }
  const res = await fetch(`data/${file}`);
  if (!res.ok) throw new Error(file);
  return res.json();
}

export async function loadForm(formId) {
  const catalog = await loadCatalog();
  const meta = catalog.forms.find((f) => f.id === formId);
  if (!meta) throw new Error("未知表单: " + formId);
  const bank = await loadBankByFile(meta.file);
  return { catalog, meta, bank };
}

export function rewireHomeLinks() {
  document.querySelectorAll('a[href="index.html"], a[href="./index.html"]').forEach((a) => {
    a.setAttribute("href", offlineHref("home"));
  });
}

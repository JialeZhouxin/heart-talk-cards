import { diffLikert, summarize } from "./compare.js";
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
import { exportOneForm } from "./form-logic.js";
import { loadForm, offlineHref, rewireHomeLinks, isOfflinePack } from "./data-loader.js";

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

function tagLabel(kind) {
  return { match: "一致", near: "差1", far: "差≥2", missing: "未齐" }[kind] || kind;
}

function formId() {
  let search = location.search;
  if (location.hash.includes("?")) search = "?" + location.hash.split("?")[1];
  return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("form") || "assessment";
}

async function loadCatalogForm(id) {
  return loadForm(id);
}

function labelValue(it, v, bank) {
  if (v == null) return "—";
  if (it.type === "choice" && it.options) {
    const o = it.options.find((x) => x.value === v);
    return o ? `${v} ${o.label}` : String(v);
  }
  return String(v);
}

async function main() {
  rewireHomeLinks();
  const fid = formId();
  let meta, bank;
  try {
    ({ meta, bank } = await loadCatalogForm(fid));
  } catch (e) {
    showError("题库加载失败：" + (e.message || e));
    return;
  }

  $("page-title").textContent = `对照 · ${meta.title}`;
  {
    const nm = loadState(fid).people;
    $("link-fill-a").textContent = `填 ${nm.a.displayName || "丈夫"}`;
    $("link-fill-b").textContent = `填 ${nm.b.displayName || "妻子"}`;
  }
  $("link-fill-a").href = offlineHref("fill", { form: fid, person: "a" });
  $("link-fill-b").href = offlineHref("fill", { form: fid, person: "b" });

  $("btn-export-form").addEventListener("click", () => {
    exportOneForm(fid, loadState(fid), "both");
  });
  $("file-import-form").addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseImport(text);
      const warn = importConflict(loadRoot(), parsed, fid);
      if (
        !confirm(
          `该文件包含${describeImport(parsed)}答案，将覆盖本地同一身份，确认导入到「${meta.title}」？` +
            (warn ? `\n\n${warn}` : "")
        )
      )
        return;
      const { root } = applyImport(loadRoot(), parsed, fid);
      const r = saveRoot(root);
      if (!r.ok) showError(r.message);
      else {
        if (parsed.person) {
          const nm2 = parsed.data?.people?.[parsed.person]?.displayName;
          if (nm2) setPersonName(parsed.person, nm2);
        }
        showError("");
        location.reload();
      }
    } catch (e) {
      showError(e.message || String(e));
    }
  });

  const state = loadState(fid);
  const nameA = state.people.a.displayName || "丈夫";
  const nameB = state.people.b.displayName || "妻子";

  const scoreItems = [];
  const openItems = [];
  for (const ch of bank.chapters) {
    for (const it of ch.items) {
      if (it.type === "likert" || it.type === "choice") {
        scoreItems.push({ ...it, chapter: ch.title });
      } else {
        openItems.push({ ...it, chapter: ch.title });
      }
    }
  }

  // 未答题只算双人都没答；单侧未答仍进列表（标未齐），牧师才看得到缺口
  const isMissing = (it) => {
    const a = state.people.a.answers[it.id];
    const b = state.people.b.answers[it.id];
    const sideMissing =
      (it.type === "likert" || it.type === "choice")
        ? (v) => v == null
        : (v) => !(typeof v === "string" && v.trim());
    return sideMissing(a) && sideMissing(b);
  };

  const pairs = scoreItems
    .filter((it) => !isMissing(it))
    .map((it) => ({
      a: state.people.a.answers[it.id],
      b: state.people.b.answers[it.id],
    }));
  const stats = summarize(pairs);

  const renderSummary = () => {
    $("summary").innerHTML = `
      <span class="pill match">一致 ${stats.match}</span>
      <span class="pill near">差1 ${stats.near}</span>
      <span class="pill far">差≥2 ${stats.far}</span>
      <span class="pill missing">未答 ${stats.missing}</span>
    `;
    if (!scoreItems.some((it) => !isMissing(it))) {
      $("filters").hidden = true;
      $("list").innerHTML =
        '<p class="muted">此表单无可数值对照题，请看下方开放题并排。</p>';
    }
  };

  const currentFilter = () =>
    pageRoot().querySelector('input[name="filter"]:checked')?.value || "diff_only";

  const renderList = () => {
    if (!scoreItems.length) return;
    const filter = currentFilter();
    const list = $("list");
    list.innerHTML = "";
    let shown = 0;
    for (const it of scoreItems) {
      if (isMissing(it)) continue;
      const a = state.people.a.answers[it.id];
      const b = state.people.b.answers[it.id];
      const kind = diffLikert(a, b);
      if (filter === "diff_only" && (kind === "match" || kind === "missing")) continue;
      if (filter === "far_only" && kind !== "far") continue;
      if (filter === "missing_only" && kind !== "missing") continue;
      shown++;
      const row = document.createElement("div");
      row.className = "compare-row";
      row.innerHTML = `
        <div class="prompt">${it.prompt}<div class="muted">${it.chapter}</div></div>
        <div>${nameA}：<strong>${labelValue(it, a, bank)}</strong></div>
        <div>${nameB}：<strong>${labelValue(it, b, bank)}</strong></div>
        <div><span class="tag ${kind}">${tagLabel(kind)}</span></div>
      `;
      list.appendChild(row);
    }
    if (!shown) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "当前过滤下没有题目。可切换过滤或先去填写。";
      list.appendChild(empty);
    }
  };

  const renderOpen = () => {
    const box = $("open-list");
    box.innerHTML = "";
    let shown = 0;
    for (const it of openItems) {
      const a = state.people.a.answers[it.id];
      const b = state.people.b.answers[it.id];
      const hasA = typeof a === "string" && a.trim();
      const hasB = typeof b === "string" && b.trim();
      if (!hasA && !hasB) continue;
      shown++;
      const card = document.createElement("div");
      card.className = "item";
      card.innerHTML = `
        <div class="prompt">${it.prompt}</div>
        <div class="muted" style="margin-bottom:6px">${it.chapter}</div>
        <div class="open-grid">
          <div><div class="muted">${nameA}</div><div class="open-box">${hasA ? a : "（未填）"}</div></div>
          <div><div class="muted">${nameB}</div><div class="open-box">${hasB ? b : "（未填）"}</div></div>
        </div>
      `;
      box.appendChild(card);
    }
    if (!shown) {
      box.innerHTML = `<p class="muted">双方开放题都未填写。</p>`;
    }
  };

  const missingCount = () => openItems.filter((it) => isMissing(it)).length;
  const renderGaps = () => {
    const box = $("gap-list");
    const gaps = openItems.filter((it) => isMissing(it));
    $("gap-count").textContent = gaps.length
      ? `${gaps.length} 题双方都没答`
      : "开放题都有人答了";
    box.innerHTML = gaps
      .map(
        (it) =>
          `<div class="item"><div class="prompt">${it.prompt}</div><div class="muted">${it.chapter} · 双方未答</div></div>`
      )
      .join("");
  };

  pageRoot().querySelectorAll('input[name="filter"]').forEach((el) => {
    el.addEventListener("change", renderList);
  });

  const filterLabel = () => {
    const v = currentFilter();
    return {
      all_answered: "全部已填（含未答一侧）",
      diff_only: "仅差异（双方已答）",
      far_only: "仅红（差≥2）",
      missing_only: "仅未齐（单侧未答）",
    }[v] || v;
  };

  const fillPrintMeta = () => {
    const metaEl = $("print-meta");
    const foot = $("print-footer");
    if (!metaEl) return;
    const when = new Date();
    const stamp = `${when.getFullYear()}-${String(when.getMonth() + 1).padStart(2, "0")}-${String(when.getDate()).padStart(2, "0")}`;
    metaEl.hidden = false;
    metaEl.innerHTML = `
      <h1 class="print-title">婚前辅导对照报告</h1>
      <p><strong>表单：</strong>${meta.title}</p>
      <p><strong>双方：</strong>${nameA} / ${nameB}</p>
      <p><strong>筛选：</strong>${filterLabel()} · 一致 ${stats.match} · 差1 ${stats.near} · 差≥2 ${stats.far} · 未齐 ${stats.missing}</p>
      <p><strong>开放题：</strong>${openItems.length - missingCount()} 题已答 · ${missingCount()} 题双方未答</p>
      <p><strong>打印日期：</strong>${stamp}</p>
    `;
    if (foot) foot.hidden = false;
  };

  $("btn-print-report")?.addEventListener("click", () => {
    const includeOpen = $("print-include-open")?.checked !== false;
    const includeGaps = $("print-include-gaps")?.checked !== false;
    $("open-section")?.classList.toggle("print-hide", !includeOpen);
    $("gap-section")?.classList.toggle("print-hide", !includeGaps);
    fillPrintMeta();
    // ensure list matches current filter (default diff_only)
    renderList();
    window.print();
  });

  renderSummary();
  renderList();
  renderOpen();
  renderGaps();
}

main();

import {
  applyImport,
  exportOneForm,
  getAnswer,
  loadRoot,
  loadState,
  parseImport,
  saveRoot,
  saveState,
  setAnswer,
} from "./storage.js";
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

function qs() {
  let search = location.search;
  if (location.hash.includes("?")) {
    search = "?" + location.hash.split("?")[1];
  } else if (location.hash.startsWith("#/fill")) {
    search = "";
  }
  const u = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const form = u.get("form") || "assessment";
  const person = u.get("person") === "b" ? "b" : "a";
  return { form, person };
}

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

async function loadCatalogForm(formId) {
  return loadForm(formId);
}

async function main() {
  rewireHomeLinks();
  const { form: formId, person } = qs();
  let meta, bank;
  try {
    ({ meta, bank } = await loadCatalogForm(formId));
  } catch (e) {
    showError("题库加载失败：" + (e.message || e));
    return;
  }

  let state = loadState(formId);
  let chapterIndex = 0;
  const defaultLikertLabels =
    bank.scale?.labels || ["非常同意", "同意", "中立", "不同意", "非常不同意"];

  function scaleLegendHtml(kind) {
    if (kind === "choice") {
      // use first choice item options if any
      for (const ch of bank.chapters) {
        for (const it of ch.items) {
          if (it.type === "choice" && it.options?.length) {
            const parts = it.options.map((o) => `${o.value}=${o.label}`);
            return `选项含义：${parts.join("　")}`;
          }
        }
      }
      return "选项含义：见各题下方说明";
    }
    // likert
    const parts = defaultLikertLabels.map((lab, i) => `${i + 1}=${lab}`);
    return `程度含义：${parts.join("　")}`;
  }

  function updateScaleLegend() {
    const el = $("scale-legend");
    if (!el) return;
    const ch = bank.chapters[chapterIndex];
    const hasLikert = ch.items.some((it) => it.type === "likert");
    const hasChoice = ch.items.some((it) => it.type === "choice");
    const lines = [];
    if (hasLikert) lines.push(scaleLegendHtml("likert"));
    if (hasChoice) lines.push(scaleLegendHtml("choice"));
    if (!lines.length) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.innerHTML = lines.map((x) => `<div>${x}</div>`).join("");
  }

  $("title").textContent = `${meta.short || meta.title} · ${
    state.people[person].displayName || (person === "a" ? "丈夫" : "妻子")
  }`;
  $("link-compare").href = offlineHref("compare", { form: formId });
  $("link-compare").hidden = meta.compare === false;

  $("btn-export-form").addEventListener("click", () => {
    exportOneForm(formId, loadState(formId));
  });
  $("file-import-form").addEventListener("change", async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseImport(text);
      if (!confirm(`将覆盖「${meta.title}」丈夫/妻子全部答案，确认？`)) return;
      const { root } = applyImport(loadRoot(), parsed, formId);
      const r = saveRoot(root);
      if (!r.ok) showError(r.message);
      else {
        showError("");
        location.reload();
      }
    } catch (e) {
      showError(e.message || String(e));
    }
  });

  const persist = () => {
    const r = saveState(formId, state);
    if (!r.ok) showError(r.message);
  };

  const chapterDone = (ch) => {
    let done = 0;
    for (const it of ch.items) {
      const v = getAnswer(state, person, it.id);
      if (it.type === "likert" || it.type === "choice") {
        if (Number.isInteger(v) && v >= 1 && v <= 5) done++;
      } else if (typeof v === "string" && v.trim()) done++;
    }
    return `${done}/${ch.items.length}`;
  };

  const renderNav = () => {
    const nav = $("chapters-nav");
    nav.innerHTML = "";
    bank.chapters.forEach((ch, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = `${idx + 1}`;
      b.title = ch.title;
      if (idx === chapterIndex) b.classList.add("active");
      b.addEventListener("click", () => {
        chapterIndex = idx;
        render();
      });
      nav.appendChild(b);
    });
  };

  const renderChoiceOrLikert = (it, div) => {
    const scale = document.createElement("div");
    scale.className = "scale";
    const cur = getAnswer(state, person, it.id);
    let options;
    if (it.type === "choice" && it.options) {
      options = it.options.map((o) => ({ value: o.value, label: String(o.value), hint: o.label }));
      scale.style.gridTemplateColumns = `repeat(${options.length}, minmax(0,1fr))`;
    } else {
      options = [1, 2, 3, 4, 5].map((n, i) => ({
        value: n,
        label: String(n),
        hint: defaultLikertLabels[i] || "",
      }));
    }
    for (const opt of options) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "scale-btn";
      const meaning = opt.hint || opt.label;
      btn.title = `${opt.value}：${meaning}`;
      btn.setAttribute("aria-label", `${opt.value} ${meaning}`);
      btn.innerHTML = `<span class="scale-num">${opt.value}</span><span class="scale-mean">${meaning}</span>`;
      if (cur === opt.value) btn.classList.add("selected");
      btn.addEventListener("click", () => {
        state = setAnswer(state, person, it.id, opt.value, it.type);
        persist();
        renderItems();
        $("chapter-progress").textContent = `本章 ${chapterDone(bank.chapters[chapterIndex])}`;
      });
      scale.appendChild(btn);
    }
    div.appendChild(scale);
    if (it.type === "choice" && it.options) {
      const labs = document.createElement("div");
      labs.className = "scale-labels";
      labs.style.gridTemplateColumns = `repeat(${it.options.length}, 1fr)`;
      for (const o of it.options) {
        const s = document.createElement("span");
        s.textContent = o.label;
        labs.appendChild(s);
      }
      div.appendChild(labs);
    } else if (it.type === "likert") {
      const labs = document.createElement("div");
      labs.className = "scale-labels";
      for (const lab of defaultLikertLabels) {
        const s = document.createElement("span");
        s.textContent = lab;
        labs.appendChild(s);
      }
      div.appendChild(labs);
    }
  };

  const renderItems = () => {
    const ch = bank.chapters[chapterIndex];
    $("chapter-title").textContent = ch.title;
    $("chapter-progress").textContent = `本章 ${chapterDone(ch)}`;
    const box = $("items");
    box.innerHTML = "";
    for (const it of ch.items) {
      const div = document.createElement("div");
      div.className = "item";
      const prompt = document.createElement("div");
      prompt.className = "prompt";
      prompt.textContent = it.prompt;
      div.appendChild(prompt);
      if (it.type === "likert" || it.type === "choice") {
        renderChoiceOrLikert(it, div);
      } else {
        const ta = document.createElement("textarea");
        ta.placeholder = "在此填写…";
        ta.value = getAnswer(state, person, it.id) || "";
        ta.addEventListener("input", () => {
          state = setAnswer(state, person, it.id, ta.value, "open");
          persist();
          $("chapter-progress").textContent = `本章 ${chapterDone(ch)}`;
        });
        div.appendChild(ta);
      }
      box.appendChild(div);
    }
  };

  const render = () => {
    renderNav();
    renderItems();
    updateScaleLegend();
    $("prev").disabled = chapterIndex <= 0;
    $("next").textContent =
      chapterIndex >= bank.chapters.length - 1
        ? meta.compare === false
          ? "回首页"
          : "去对照页"
        : "下一章";
  };

  $("prev").addEventListener("click", () => {
    if (chapterIndex > 0) {
      chapterIndex--;
      render();
      window.scrollTo(0, 0);
    }
  });
  $("next").addEventListener("click", () => {
    if (chapterIndex >= bank.chapters.length - 1) {
      if (meta.compare === false) location.href = offlineHref("home");
      else location.href = offlineHref("compare", { form: formId });
      return;
    }
    chapterIndex++;
    render();
    window.scrollTo(0, 0);
  });

  render();
}

main();

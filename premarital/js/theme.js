/** 主题切换。
 *
 * 设计约束：离线单文件包把首页/填写/对照三个视图塞在同一个 document 里，
 * 每次路由都会重建 DOM。所以这里：
 *   1) 不按 id 绑按钮，改用 document 上的事件委托（绑定一次就够）；
 *   2) 不做 textContent 切换，图标/文案两套形态全部由 CSS 按
 *      :root[data-theme] 决定，DOM 重建后样式自然跟上；
 *   3) initTheme() 只负责「应用当前主题」+「接一次委托」。
 *
 * 首屏防闪由各页 <head> 里的内联 prepaint 片段负责（只设 data-theme）。
 */

const KEY = "premarital-theme";

export function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** 应用主题到根节点，并同步所有主题按钮的无障碍属性。 */
export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const dark = theme === "dark";
  for (const btn of document.querySelectorAll(".theme-btn")) {
    btn.setAttribute("aria-pressed", String(dark));
  }
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
}

/** 切换主题。 */
export function toggleTheme() {
  applyTheme(currentTheme() === "dark" ? "light" : "dark");
}

let wired = false;

/** 接线（幂等）+ 应用已保存/系统偏好的主题。 */
export function initTheme() {
  if (!wired) {
    wired = true;
    document.addEventListener("click", (ev) => {
      if (ev.target.closest(".theme-btn")) toggleTheme();
    });
  }

  const stored = document.documentElement.getAttribute("data-theme");
  if (stored === "dark" || stored === "light") {
    // prepaint 已经决定了首屏主题，这里只同步按钮属性
    applyTheme(stored);
    return;
  }
  let saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {}
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

initTheme();

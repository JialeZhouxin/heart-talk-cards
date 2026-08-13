# 婚前关系评估 Web 应用 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 本地静态网页完成《婚前关系评估》双方填写与自动色标对照（绿/黄/红），数据仅存浏览器，可 JSON 导入导出。

**Architecture:** 多页静态站 `web/`：题库 JSON + `localStorage` 答卷；`storage.js` 管读写/导入导出；`compare.js` 纯函数算差值；填写页/对照页读题库渲染。无后端、零 npm 运行时依赖。

**Tech Stack:** HTML + CSS + 原生 JS；Python 仅用于一次性生成 `assessment.json` 与可选 assert 自检；预览用 `python -m http.server`。

**Spec:** `docs/superpowers/specs/2026-07-15-premarital-assessment-web-design.md`

---

## 文件结构

| 路径 | 职责 |
|---|---|
| `scripts/build_assessment_json.py` | 从两份 md 生成 `web/data/assessment.json`，打印题数/缺题 |
| `web/data/assessment.json` | 静态题库 |
| `web/js/storage.js` | load/save、进度、export/import、空值约定 |
| `web/js/compare.js` | `diffLikert(a,b)` → match/near/far/missing；汇总统计 |
| `web/js/fill.js` | 填写页渲染与自动保存 |
| `web/js/home.js` | 首页进度、导入导出按钮 |
| `web/js/compare-page.js` | 对照页渲染与过滤 |
| `web/css/app.css` | 共用样式、三色、移动端点选区 |
| `web/index.html` | 首页 |
| `web/fill.html` | 填写页 `?person=a\|b` |
| `web/compare.html` | 对照页 |
| `web/js/selfcheck.js` | 可选：compare 纯函数 3 断言，控制台跑 |
| `web/README.md` | 如何本地打开、备份提示 |

---

## Chunk 1: 题库生成

### Task 1: 生成 assessment.json

**Files:**
- Create: `scripts/build_assessment_json.py`
- Create: `web/data/assessment.json`（脚本输出）

- [ ] **Step 1: 写生成脚本**

解析规则（对齐规格 §4.1）：

1. 读 `婚前关系评估.md`：
   - `## ` / `### ` → chapter（`id` 用 slug：`err1`…`err7`，`trait1`…`trait10`）
   - `^\d+\. .+______` → likert（去掉尾部 underscore）
   - `^\d+\. ` 且无 `______` → open；若下一非空行为单独 `>`，仍算一题
2. 读 `婚前关系评估-对照.md`：编号题且下一行含「我方」→ likert 候选，按 prompt 并入对应 chapter（无匹配 chapter 则挂 `_extra` 并打印警告）
3. 输出 JSON：`version, scale, chapters[{id,title,part,items[{id,type,prompt}]}]`
4. stdout 打印：`likert_count`、`open_count`、仅评估有/仅对照有 的列表

```python
# scripts/build_assessment_json.py 核心约定
# STORAGE 不在此文件；只生成题库
# item id: f"{chapter_id}_l{n}" / f"{chapter_id}_o{n}"
```

- [ ] **Step 2: 跑脚本**

Run:
```bash
python scripts/build_assessment_json.py
```
Expected: 写出 `web/data/assessment.json`；打印 `likert_count>=140`、`open_count>=40`；无 traceback。

- [ ] **Step 3: 抽查 JSON**

Run:
```bash
python -c "import json; d=json.load(open('web/data/assessment.json',encoding='utf-8')); print(len(d['chapters']), sum(1 for c in d['chapters'] for i in c['items'] if i['type']=='likert'), sum(1 for c in d['chapters'] for i in c['items'] if i['type']=='open'))"
```
Expected: chapters≈17；likert/open 与脚本打印一致。

- [ ] **Step 4: 若有缺题清单非空**

人工补进 `assessment.json` 对应 chapter（不静默丢题）。再跑 Step 3。

---

## Chunk 2: 存储与对比核心（先测后写）

### Task 2: compare.js 纯函数 + 自检

**Files:**
- Create: `web/js/compare.js`
- Create: `web/js/selfcheck.js`

- [ ] **Step 1: 写 compare.js**

```javascript
// web/js/compare.js
export function diffLikert(a, b) {
  if (a == null || b == null) return 'missing';
  const d = Math.abs(Number(a) - Number(b));
  if (d === 0) return 'match';
  if (d === 1) return 'near';
  return 'far';
}

export function summarize(pairs) {
  // pairs: [{a,b}] both may be null
  const s = { match: 0, near: 0, far: 0, missing: 0 };
  for (const { a, b } of pairs) s[diffLikert(a, b)]++;
  return s;
}
```

（若不用 ES module，则挂 `window.PremaritalCompare = { diffLikert, summarize }`，全站统一一种方式。**本计划统一：无 bundler，用 `type=module`。**）

- [ ] **Step 2: 写 selfcheck.js（3 断言）**

```javascript
import { diffLikert, summarize } from './compare.js';
console.assert(diffLikert(1, 1) === 'match');
console.assert(diffLikert(1, 2) === 'near');
console.assert(diffLikert(1, 4) === 'far');
console.assert(diffLikert(null, 1) === 'missing');
console.log('selfcheck ok', summarize([{ a: 1, b: 1 }, { a: 1, b: 3 }]));
```

- [ ] **Step 3: 浏览器或临时页验证**

在 `web/` 起服务后打开带 selfcheck 的临时验证，或在 compare 页 dev 引入一次。  
Expected: 控制台 `selfcheck ok`。

### Task 3: storage.js

**Files:**
- Create: `web/js/storage.js`

- [ ] **Step 1: 实现 API**

```javascript
// web/js/storage.js
const KEY = 'premarital.assessment.v1';

export function emptyState() {
  return {
    version: 1,
    people: {
      a: { displayName: '我方', answers: {}, updatedAt: null },
      b: { displayName: '对方', answers: {}, updatedAt: null },
    },
  };
}

export function loadState() { /* JSON.parse localStorage; 坏数据 → emptyState */ }
export function saveState(state) {
  // try localStorage; QuotaExceeded/禁用 → 内存副本 + 提示用户立刻导出
  // ponytail: 无完整离线队列，满盘时以导出文件为唯一持久化
}
export function setAnswer(person, itemId, value, type) {
  // likert: 1-5 number；非法删 key
  // open: trim 后空 → 删 key；否则存字符串
  // 更新 people[person].updatedAt = new Date().toISOString()
}
export function progress(state, bank) {
  // 返回 { a: {likertDone,likertTotal,openDone,openTotal}, b: {...} }
}
export function exportJSON(state) { /* Blob download premarital-assessment.json */ }
export function parseImport(text) {
  // 校验 version + people.a/b；失败 throw Error 中文消息
}
export function applyImport(local, imported, persons /* ['a']|['b']|['a','b'] */) {
  // 整体替换所选 person 的 answers/displayName/updatedAt
}
```

空值约定严格按规格 §4.2。

- [ ] **Step 2: 手写最小 node/浏览器检查（可选）**

若环境无 DOM，至少用 python 不测 storage；实现后在首页点一次导出导入验收（Task 7）。

---

## Chunk 3: 页面与样式

### Task 4: CSS 与壳页面

**Files:**
- Create: `web/css/app.css`
- Create: `web/index.html`
- Create: `web/fill.html`
- Create: `web/compare.html`

- [ ] **Step 1: app.css**

- 基础排版、按钮、卡片
- `.tag-match` 绿 / `.tag-near` 黄 / `.tag-far` 红 / `.tag-missing` 灰
- 量表：5 个大按钮，`min-height: 44px`，选中态明显
- 移动端单列

- [ ] **Step 2: 三页 HTML 骨架**

公共：顶栏标题 + 隐私一行提示 + 导航链接（首页/对照）。  
`fill.html`：`?person=` 容器 `#chapters-nav` `#items` `#pager`。  
`compare.html`：过滤 radio + `#summary` + `#list`。  
`index.html`：双方进度 + 四个主按钮 + file input 导入。

全部：
```html
<script type="module" src="js/....js"></script>
```

### Task 5: 首页 home.js

**Files:**
- Create: `web/js/home.js`
- Modify: `web/index.html` 挂脚本

- [ ] **Step 1: 加载题库 `fetch('data/assessment.json')`**

失败：页面显示「题库加载失败」。

- [ ] **Step 2: 渲染进度 + 绑定**

- 填写我方 → `fill.html?person=a`
- 填写对方 → `fill.html?person=b`
- 查看对照 → `compare.html`
- 导出：`exportJSON(loadState())`
- 导入：读文件 → `parseImport` → confirm 文案含将覆盖哪些身份 → `applyImport` → `saveState` → 刷新进度

### Task 6: 填写页 fill.js

**Files:**
- Create: `web/js/fill.js`
- Modify: `web/fill.html`

- [ ] **Step 1: 解析 person**

非法 person 默认 `a`。显示 `displayName`。

- [ ] **Step 2: 章节导航 + 渲染当前章**

- open：`<textarea>`，input/change → `setAnswer`
- likert：5 按钮，click → `setAnswer` 数字
- 章进度：`已填 x / 本章 y`
- 上一章/下一章；末章提示去对照页

- [ ] **Step 3: 刷新后答案回显**

打开已填章节，按钮/文本框有值。

### Task 7: 对照页 compare-page.js

**Files:**
- Create: `web/js/compare-page.js`
- Modify: `web/compare.html`

- [ ] **Step 1: 汇总 + 默认过滤「仅差异」**

过滤选项：`all_answered` | `diff_only`（near+far）| `far_only`。  
默认 `diff_only`。missing 默认不进列表（规格）。

- [ ] **Step 2: 渲染量表行**

题干 | 我方分 | 对方分 | 色标 class。

- [ ] **Step 3: 开放题并排区**

可折叠「开放题并排」；只展示至少一方有文本的题。

---

## Chunk 4: 联调与文档

### Task 8: 本地联调清单

- [ ] **Step 1: 起静态服务**

```bash
cd web && python -m http.server 8765
```
打开 `http://127.0.0.1:8765/`

- [ ] **Step 2: 手工验收（规格 §10）**

1. 我方填 3 道量表 → 刷新仍在  
2. 对方填不同分 → 绿/黄/红正确（1vs1 绿，1vs2 黄，1vs4 红）  
3. 导出 → Application 清 localStorage → 导入 → 恢复  
4. 过滤「仅红」只显示 far  
5. 窄屏可点 1–5  

- [ ] **Step 3: 跑 selfcheck**

控制台无 assert 失败。

### Task 9: README

**Files:**
- Create: `web/README.md`

- [ ] **Step 1: 写清**

- 如何启动
- 数据在本机、清浏览器会丢、请导出备份
- 同设备切换身份 / 不同设备导出交换
- 重新生成题库：`python scripts/build_assessment_json.py`

---

## 执行备注

- **不要**加 React/Vue/npm 依赖（YAGNI）
- **不要**做七单元、登录、云同步
- 中文 UI 文案
- 无 git 仓库时跳过 commit 步骤；有 git 再按 task 提交
- 实现顺序：Task1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9

## 完成定义

- `web/data/assessment.json` 存在且题数合理
- 三页可点通，自动保存与对照色标正确
- 导入导出闭环成功
- README 可照做启动

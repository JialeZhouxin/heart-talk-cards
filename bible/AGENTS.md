# 圣经金句 · 仓库约定

> 本目录（`bible/`）是 toolbox 仓库的子项目，拥有自己的
> `src/`、`scripts/`、PWA 配置与文档。改动本目录时只需关注本文件，
> 但注意整个仓库共用一个源（localStorage 共享），见 `src/core/storage-migration.js`。

## 项目结构

纯静态前端，无构建步骤、无依赖、无框架。

- `index.html`：单页外壳与 DOM 锚点
- `src/main.js`：应用引导、状态、事件接线
- `src/core/`：领域逻辑
  - `card-service.js` 抽卡与主题筛选
  - `history-store.js` 灵修记录读写
  - `history-filter.js` 记录筛选与导出
  - `history-export.js` 分享图生成
  - `check-in.js` 打卡与连续天数
  - `stats.js` 统计计算
  - `storage-migration.js` localStorage key 定义与旧数据迁移
  - `daily-verse-service.js` 每日经文（日期种子）
  - `verse-search-service.js` 全本检索（动态 import）
- `src/ui/`：渲染（`render.js`、`stats-render.js`、`daily-verse-render.js`、`verse-note-render.js`）
- `src/data/cards.js`：200 条精选金句（首屏用）
- `src/data/bible-full.js`：全本 31105 节，**自动生成，勿手改**
- `src/app.bundle.js`：**自动生成，勿手改**，供 `file://` 使用
- `src/styles.css`：主题与响应式
- `sw.js` / `manifest.webmanifest` / `icons/`：PWA
- `data/bible-cn/cus/books.txt`：全本纯文本生成源
- `src/data/book-names.js`：66 个卷名（约 1KB），**自动生成**，用于
  全本加载前先把卷名下拉渲染出来
- `../shared/theme.css`：与仓库其它工具共用的基础样式

新逻辑放 `src/core/`，`src/main.js` 只做编排。

## 常用命令

```bash
python -m http.server 8921        # 本地预览
node scripts/check-ui-chinese.js  # 界面文案英文检查
node scripts/build-bundle.js      # 改动 src/ 后重新生成 file:// bundle
node scripts/build-bible-full.js  # 从 books.txt 重新生成全本模块
```

**改动 `src/` 下任何模块后必须重跑 `build-bundle.js`**，否则 `file://` 打开时
用的是过期代码。`check-ui-chinese.js` 在每次提交前跑。

## 代码风格

- JS/CSS 4 空格缩进，带分号
- ES modules，`const`/`let`，小函数单一职责
- JS 标识符 `camelCase`，常量 `UPPER_SNAKE_CASE`
- CSS 类名 `kebab-case`
- 优先扩展现有模块，避免重复逻辑

## 测试

无测试框架，靠脚本 + puppeteer 手工验证。

- `node scripts/check-ui-chinese.js`
- 手工冒烟：抽卡、写下感受、保存、刷新看记录是否还在、分享、
  清空记录、切主题、移动端视口
- E2E 脚本放仓库外（`D:/Temp`），不入库；结果写进 commit message

## 提交约定

简洁的祈使句标题，可带前缀：`feat:` / `fix:` / `chore:` / `docs:`。

提交信息要说明**为什么**改，而不只是改了什么。PR 需含：目的与范围、
影响的路径、验证步骤与结果。

## 中文文本改动（避免乱码）

不要在命令行内联中文参数。稳定做法：
1. 先把改动写成 UTF-8 文件
2. Node 里 `fs.readFileSync(..., 'utf8')` 读入，`.replace(/^\uFEFF/, '')` 去 BOM，按 id 替换
3. 写完立刻校验：解析文件、检查目标字段、`^\?+$` 计数必须为 0

原因：PowerShell/终端传参可能把中文静默变成 `?`。

## 安全

- 不提交任何密钥，全部客户端运行
- `localStorage` 只存本地灵修数据，不上传服务器

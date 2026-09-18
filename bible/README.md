# 圣经金句 · 灵修记录

> 抽一节经文，写下触动你的话。

一个纯静态的圣经灵修工具：抽取金句、记录触动你的经文与感受、每日经文、分享。

## 功能

- **今日经文**：每天打开就是同一节（按日期确定性抽取），当天不变、隔天更新，可「换一句」
- **抽取金句**：按 7 个主题（安慰 / 爱心 / 信心 / 力量 / 智慧 / 宽恕 / 盼望）筛选后随机抽一节
- **记一节经文**：按卷 / 章 / 节三级查找，或在全本 31105 节里关键词搜索（可限定书卷范围），写下感受
- **灵修记录**：三个入口的记录汇总在一处，可按时间 / 主题 / 来源筛选；支持编辑、删除、导出 JSON、生成分享图
- **分享**：复制文本、生成图片、生成分享链接（链接自带经文，对方打开即可看到）
- **打卡**：记录连续灵修天数
- **数据统计**：主题分布与记录来源双饼图
- **PWA**：可装到桌面/手机，支持离线打开

## 使用方式

1. 打开 https://jialezhouxin.github.io/toolbox/bible/ ，
   或直接双击 `index.html`。
2. 「今日经文」卡片上写下今天的感受。
3. 或点「抽取金句」随机抽一节，点「记一节经文」记录自己读到的经文。

## 技术实现

- 纯前端：HTML + CSS + 原生 ES modules，无构建步骤、无依赖
- 本地存储：`localStorage`（历史记录、连续天数、主题偏好）
- 经文数据：
  - `src/data/cards.js` —— 200 条精选金句（含 7 主题分类），参与首屏
  - `src/data/bible-full.js` —— 全本简体和合本 66 卷 31105 节，3.3MB，
    打开「记一节经文」时按需 `import()` 加载，不进首屏
  - `data/bible-cn/cus/books.txt` —— 全本的生成源（4MB 纯文本）

### `file://` 与 `http(s)://` 两种加载方式

| 协议 | 入口 | 说明 |
|---|---|---|
| `file://` | `src/app.bundle.js` | 浏览器禁止此协议加载 ES modules，故用打包版 |
| `http(s)://` | `src/main.js` | 正常的模块入口 |

`app.bundle.js` **是自动生成的，不要手改**。改了 `src/` 下任何模块后重新生成：

```bash
node scripts/build-bundle.js
```

全本经文（3.3MB）不进 bundle，因此 `file://` 下打开「记一节经文」会提示
经文库不可用，其余功能完整。这是有意的取舍。

## 开发

```bash
python -m http.server 8921        # 本地预览 http://127.0.0.1:8921
node scripts/check-ui-chinese.js  # 检查界面文案是否混入英文
node scripts/build-bundle.js      # 改动 src/ 后重新生成 file:// 版本的 bundle
node scripts/build-bible-full.js  # 从 books.txt 重新生成全本经文模块
```

## 数据来源

- 经文全文：圣经简体和合本（CUS）。

## 与工具箱的关系

本工具是 [toolbox](https://github.com/JialeZhouxin/toolbox)
仓库的一个子目录（`bible/`），与心语卡牌、婚前辅导等并列。
返回入口在页面左上角的「← 返回工具箱」。

原先它独立部署在 `bible-verse-cards` 仓库，网址
https://jialezhouxin.github.io/bible-verse-cards/ 仍可访问（已归档）。

两个应用同源，localStorage 共享，因此本应用使用 `bible*` 前缀的 key，
并在启动时把历史遗留的 `heartTalk*` 里的圣经记录迁移过来（心语卡牌自己的
记录会留在原 key，不受影响）。

## 说明

- 不做系统级通知推送：每日经文靠打开页面时的日期种子确定，无需服务器。
- 所有数据都存在你自己的浏览器里，不上传任何服务器。

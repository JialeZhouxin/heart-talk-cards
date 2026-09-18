# 我的工具箱

> 一个仓库，多个小工具。想用哪个，点哪个。

## 工具列表

| 工具 | 路径 | 说明 |
| ---- | ---- | ---- |
| 💌 心语卡牌 | [`heart-talk/`](heart-talk/) | 情侣、朋友、家庭深度对话卡牌，抽一张聊一聊 |
| 🧠 脑筋急转弯 | [`brain-teaser/`](brain-teaser/) | 随机出题考脑洞，答完自动打乱再来一轮 |
| 🎉 破冰游戏 | [`icebreaker/`](icebreaker/) | 话题卡、默契测试、两真一假、你画我猜，聚会热场 |
| 🧩 思维模型卡 | [`mental-models/`](mental-models/) | 抽一个思维模型，套到眼前的事上，换角度看问题 |
| 💍 婚前辅导 | [`premarital/`](premarital/) | 多表单填写、双方对照、JSON 导入导出 |
| 📖 圣经金句 | [`bible/`](bible/) | 抽经文、记触动你的话、全本检索、每日灵修 |

## 使用方式

1. 在线访问：https://jialezhouxin.github.io/toolbox/
2. 本地使用：直接打开 `index.html`（聚合首页），点卡片进工具

## 新增工具

在仓库根目录新建一个文件夹（如 `my-tool/`），把工具页面放进去，然后在根 `index.html` 的工具网格里加一张卡片即可。

## 心语卡牌（heart-talk/）

- 随机抽取卡牌、按关系类型与难度筛选、本地保存回答历史、一键复制分享
- 纯前端：HTML + CSS + JavaScript，`localStorage` 本地存储
- 纯前端：HTML + CSS + JavaScript，`localStorage` 本地存储；ES modules 加载，入口 `src/main.js`
- PWA：支持安装到手机主屏、离线使用
- 离线单文件包：`heart-talk/heart-talk-cards-offline.html`，可发给朋友直接打开；重建 `python scripts/build_offline_html.py`
- 对话历史使用 `localStorage`，不会上传服务器

## 脑筋急转弯（brain-teaser/）

- 随机出题、点击揭晓答案、不重复出题直到答完一轮
- 纯前端单文件，无需构建

## 破冰游戏（icebreaker/）

- 四种模式：话题卡（轻松/深入/搞怪分类）、默契测试（全员投票）、两真一假（抽主题编 2 真 1 假）、你画我猜（抽词、遮住防偷看、分难度）
- 随机出题、不重复直到一轮答完；纯前端单文件，无需构建

## 思维模型卡（mental-models/）

- 思维模型提示卡：**用一下**（把模型套到眼前的事）/**讲一遍**（讲一次相关经历）/**猜模型**（看描述猜模型，点卡片揭晓）
- 25 个模型，来自 16 本书（《思考，快与慢》《穷查理宝典》《影响力》《学会提问》《模型思维》《怎样解题》《六顶思考帽》《水平思考法》《金字塔原理》《麦肯锡结构化战略思维》《系统之美》《第五项修炼》《灰度决策》《黑天鹅》《反脆弱》《创新者的窘境》）
- 卡片显示模型名 + 出处；随机出不重复；纯前端单文件，无需构建
- 由原「优点放大镜」改造，主题词 `mental-models-theme`

## 圣经金句（bible/）

- 今日经文（按日期确定性抽取，当天不变）、按 7 主题抽卡、记一节经文（按卷查找 + 全本 31105 节关键词搜索）
- 灵修记录统一列表，可按时间/主题/来源筛选；编辑、删除、导出 JSON、生成分享图
- 数据全在本机浏览器（`localStorage`，`bible*` 前缀，与心语卡牌互不干扰）；PWA 可离线
- 全本检索按需加载 3.3MB 经文，卷名先用轻量索引秒出，不阻塞界面
- 原独立仓库 `bible-verse-cards` 已归档，老网址仍可访问
- 无构建步骤；改动 `bible/src/` 后需 `node bible/scripts/build-bundle.js` 重新生成 `file://` 版本

## 婚前辅导（premarital/）

- 多表单（婚前关系评估、期望、原生家庭、性生活等 7 张）+ 双方对照 + 打印报告
- 称呼可自定义；填写页「导出本表」只导自己那一侧（带身份标记），汇总后导出全部 JSON
- 数据仅存本机浏览器（localStorage），JSON 导入导出；PWA 可离线
- 课程材料（单元一~七）与构建脚本在 `docs/`、`scripts/`；离线包重建：`python premarital/scripts/build_offline_html.py`
- 原独立仓库 `premarital-counseling-forms` 已归档，老网址仍可访问

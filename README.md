# 我的工具箱

> 一个仓库，多个小工具。想用哪个，点哪个。

## 工具列表

| 工具 | 路径 | 说明 |
| ---- | ---- | ---- |
| 💌 心语卡牌 | [`heart-talk/`](heart-talk/) | 情侣、朋友、家庭深度对话卡牌，抽一张聊一聊 |
| 🧠 脑筋急转弯 | [`brain-teaser/`](brain-teaser/) | 随机出题考脑洞，答完自动打乱再来一轮 |
| 🎉 破冰游戏 | [`icebreaker/`](icebreaker/) | 话题卡、默契测试、两真一假、你画我猜，聚会热场 |
| 🔍 优点放大镜 | [`praise/`](praise/) | 引导大家发现彼此的闪光点，互相夸夸 |

## 使用方式

1. 在线访问：https://jialezhouxin.github.io/heart-talk-cards/
2. 本地使用：直接打开 `index.html`（聚合首页），点卡片进工具

## 新增工具

在仓库根目录新建一个文件夹（如 `my-tool/`），把工具页面放进去，然后在根 `index.html` 的工具网格里加一张卡片即可。

## 心语卡牌（heart-talk/）

- 随机抽取卡牌、按关系类型与难度筛选、本地保存回答历史、一键复制分享
- 纯前端：HTML + CSS + JavaScript，`localStorage` 本地存储
- `file://` 场景自动加载 `src/app.bundle.js`；`http(s)://` 场景加载模块入口 `src/main.js`
- PWA：支持安装到手机主屏、离线使用
- 离线单文件包：`heart-talk/heart-talk-cards-offline.html`，可发给朋友直接打开；重建 `python scripts/build_offline_html.py`
- 对话历史使用 `localStorage`，不会上传服务器

## 脑筋急转弯（brain-teaser/）

- 随机出题、点击揭晓答案、不重复出题直到答完一轮
- 纯前端单文件，无需构建

## 破冰游戏（icebreaker/）

- 四种模式：话题卡（轻松/深入/搞怪分类）、默契测试（全员投票）、两真一假（抽主题编 2 真 1 假）、你画我猜（抽词、遮住防偷看、分难度）
- 随机出题、不重复直到一轮答完；纯前端单文件，无需构建

## 优点放大镜（praise/）

- 群体夸夸引导提示卡：挑一个人夸 / 轮流夸 / 猜着夸三种玩法
- 内置夸人公式（具体事件 + 你的感受）；随机出不重复；纯前端单文件

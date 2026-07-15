# 心语卡牌

> 用问题打开话匣子，让彼此更靠近一点。

一个轻量的对话卡牌应用，适合情侣、朋友、家庭和自我探索场景。

## 功能

- 随机抽取卡牌
- 按关系类型与难度筛选
- 本地保存回答历史
- 一键复制分享内容

## 使用方式

1. 直接打开 `index.html`。
2. 点击“抽取卡牌”开始对话。
3. 可保存回答并查看历史。

## 技术实现

- 纯前端：HTML + CSS + JavaScript
- 本地存储：`localStorage`

## 说明

- `file://` 场景自动加载 `src/app.bundle.js`
- `http(s)://` 场景加载模块入口 `src/main.js`


## 在线访问

https://jialezhouxin.github.io/heart-talk-cards/

## 安装到主屏幕（PWA）

- **Android Chrome**：打开站点 → 菜单 →「安装应用」或「添加到主屏幕」
- **iPhone Safari**：分享 →「添加到主屏幕」
- 首次需联网加载并缓存；之后可离线打开（历史仍在本机）

## 离线单文件包

- 文件：`heart-talk-cards-offline.html`
- 站点页也可点「下载离线包」
- 用法：把 HTML 发给朋友 / 存手机 → 浏览器直接打开，无需服务器
- 重建：`python scripts/build_offline_html.py`

## 说明补充

- 对话历史使用 `localStorage`，不会上传服务器
- 外链 Google Fonts 在离线包中已去除，避免依赖网络字体

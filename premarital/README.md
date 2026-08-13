# 婚前辅导多表单（本地网页）

浏览器内填写婚前辅导问卷，支持丈夫/妻子双方填写、自动对照、JSON 导入导出。  
**数据只存在本机浏览器，不上云。**

## 在线访问

https://jialezhouxin.github.io/premarital-counseling-forms/

## 本地运行

```bash
cd web
python -m http.server 8765
```

打开：http://127.0.0.1:8765/

## 功能

- 多表单：评估、约谈、期待、原生家庭、沟通、夫妻角色、性观念
- 丈夫 / 妻子分身份填写
- 量表/选择题自动色标对照（绿一致 / 黄差1 / 红差≥2）
- 单表或全部 JSON 导入导出；双机默认按人合并

## 测试

```bash
node scripts/test_import_export.mjs
```

## 目录

| 路径 | 说明 |
|---|---|
| `web/` | 静态站点（GitHub Pages 发布目录） |
| `scripts/` | 题库生成与导入导出测试 |
| `docs/` | 设计规格与实现计划 |

空白 Markdown 模板见仓库根目录 `*.md`（不含已填个人信息的 Word 原件）。


## 安装为 App（PWA）

- **Android Chrome**：打开站点 → 菜单 →「安装应用」或「添加到主屏幕」
- **iPhone Safari**：分享 →「添加到主屏幕」
- 首次需联网加载并缓存；之后可离线打开填写（答案仍在本机）
- 双机合并仍用 JSON 导出/导入（或隔空投送文件）


## 离线单文件包

- 文件：`web/premarital-counseling-offline.html`（也可在站点首页点「下载离线单文件」）
- 用法：把该 HTML 发给朋友 / 存到手机 → **直接用浏览器打开**，无需服务器、无需联网
- 重建：`python scripts/build_offline_html.py`（输出 `dist/` 并请复制到 `web/`）
- 答案仍在本机；双机对照继续用 JSON 导入导出


## 牧者打印报告

1. 双方填完并导入到同一浏览器  
2. 打开对应表单的 **对照** 页  
3. 默认筛选 **仅差异**；可选「仅红」或「全部已填」  
4. 勾选是否 **打印含开放题**  
5. 点 **打印报告** → 浏览器打印/另存 PDF  

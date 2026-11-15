# 墨迹博客 · React 博客展示站

一个基于 Vite + React 的博客展示项目，包含文章列表、分类筛选、搜索和文章详情页。

## 快速开始

```bash
npm install
npm run dev
```

启动后访问 http://localhost:5173

## 功能

- 文章卡片列表（渐变封面、标签、阅读时长）
- 分类筛选 + 关键词实时搜索
- 文章详情页（含相关文章推荐）
- 响应式布局，适配移动端

## 目录结构

```
src/
├── main.jsx          # 入口
├── App.jsx           # 应用主体（列表 + 详情切换）
├── index.css         # 全局样式
└── data/posts.js     # 博客文章数据（可替换为接口请求）
```

## 后续扩展建议

- 接入 react-router 实现真实 URL 路由
- 用 Markdown 渲染文章内容（如 react-markdown）
- 将数据替换为后端 API 或 CMS

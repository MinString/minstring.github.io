# 🍥Fuwari

基于 [Astro](https://astro.build) 构建的静态博客主题。

[**🖥️ 在线演示（Vercel）**](https://fuwari.vercel.app)

![预览截图](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 特性

- [x] 基于 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- [x] 流畅的动画和页面过渡效果
- [x] 浅色 / 深色模式
- [x] 可自定义的主题颜色和横幅
- [x] 响应式设计
- [ ] 评论
- [x] 搜索
- [x] TOC（目录导航）

## 👀 环境要求

- Node.js <= 22
- pnpm <= 9

## 🚀 使用方法一

使用 [create-fuwari](https://github.com/L4Ph/create-fuwari) 在本地初始化项目。

```sh
# npm
npm create fuwari@latest

# yarn
yarn create fuwari

# pnpm
pnpm create fuwari@latest

# bun
bun create fuwari@latest

# deno
deno run -A npm:create-fuwari@latest
```

1. 编辑 `src/config.ts` 配置文件以自定义你的博客。
2. 运行 `pnpm new-post <文件名>` 创建新文章，然后在 `src/content/posts/` 中编辑。
3. 按照[部署指南](https://docs.astro.build/en/guides/deploy/)将博客部署到 Vercel、Netlify、GitHub Pages 等平台。部署前需要编辑 `astro.config.mjs` 中的站点配置。

## 🚀 使用方法二

1. 从此模板[生成新仓库](https://github.com/saicaca/fuwari/generate)或 Fork 此仓库。
2. 要在本地编辑博客，克隆你的仓库，运行 `pnpm install` 和 `pnpm add sharp` 安装依赖。
   - 如果尚未安装 [pnpm](https://pnpm.io)，请运行 `npm install -g pnpm`。
3. 编辑 `src/config.ts` 配置文件以自定义你的博客。
4. 运行 `pnpm new-post <文件名>` 创建新文章，然后在 `src/content/posts/` 中编辑。
5. 按照[部署指南](https://docs.astro.build/en/guides/deploy/)将博客部署到 Vercel、Netlify、GitHub Pages 等平台。部署前需要编辑 `astro.config.mjs` 中的站点配置。

## ⚙️ 文章 Frontmatter

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新 Astro 博客的第一篇文章。
image: /images/cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

## 🧞 命令

所有命令都在项目根目录下的终端中运行：

| 命令                                | 操作                                               |
|:------------------------------------|:---------------------------------------------------|
| `pnpm install` 和 `pnpm add sharp`  | 安装依赖                                           |
| `pnpm dev`                          | 启动本地开发服务器，地址 `localhost:4321`           |
| `pnpm build`                        | 构建生产版本到 `./dist/` 目录                       |
| `pnpm preview`                      | 部署前本地预览构建结果                              |
| `pnpm new-post <文件名>`            | 创建新文章                                         |
| `pnpm astro ...`                    | 运行 CLI 命令，如 `astro add`、`astro check`        |
| `pnpm astro --help`                 | 获取 Astro CLI 的使用帮助                           |

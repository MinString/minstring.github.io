---
title: Markdown 扩展功能
published: 2024-05-01
updated: 2024-11-29
description: '了解更多关于 Fuwari 中的 Markdown 功能'
image: ''
tags: [Demo, Example, Markdown, Fuwari]
category: 'Examples'
draft: true
---

## GitHub 仓库卡片
你可以添加链接到 GitHub 仓库的动态卡片，页面加载时会从 GitHub API 拉取仓库信息。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用代码 `::github{repo="<owner>/<repo>"}` 创建 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

## 提示块

支持以下类型的提示块：`note` `tip` `important` `warning` `caution`

:::note
即使用户只是快速浏览，也应关注的信息。
:::

:::tip
帮助用户更成功的可选信息。
:::

:::important
用户成功所必需的关键信息。
:::

:::warning
因潜在风险而需要用户立即关注的关键内容。
:::

:::caution
某个操作可能带来的负面后果。
:::

### 基本语法

```markdown
:::note
即使用户只是快速浏览，也应关注的信息。
:::

:::tip
帮助用户更成功的可选信息。
:::
```

### 自定义标题

提示块的标题可以自定义。

:::note[自定义标题]
这是一个带有自定义标题的提示。
:::

```markdown
:::note[自定义标题]
这是一个带有自定义标题的提示。
:::
```

### GitHub 语法

> [!TIP]
> [GitHub 语法](https://github.com/orgs/community/discussions/16925) 也是支持的。

```
> [!NOTE]
> GitHub 语法也是支持的。

> [!TIP]
> GitHub 语法也是支持的。
```

### 剧透

你可以为文本添加剧透效果。文本也支持 **Markdown** 语法。

内容 :spoiler[被隐藏了 **嘿嘿**]！

```markdown
内容 :spoiler[被隐藏了 **嘿嘿**]！
```

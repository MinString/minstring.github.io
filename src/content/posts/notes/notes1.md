---
title: 学习笔记1
published: 2026-09-22
description: '这是高代的第二周课'
image: ''
tags: ['学习笔记','高等线性代数']
category: '学习笔记'
draft: false
lang: 'zh_CN'
---
由于这是第一次写笔记 ，会有很多数学公式，我会在结尾贴上一些LaTeX的代码。主要参考了[洛谷LaTeX格式手册](https://help.luogu.com.cn/rules/academic/handbook/latex)和[katex手册](https://katex.org/docs/supported.html)。

## 承接上一节课

这是一个一般的线性方程组
$$
(*)
\begin{cases}
a_{1,1}x_1 + a_{1,2}x_2 + \cdots + a_{1,n}x_n = b_1 \\
a_{2,1}x_1 + a_{2,2}x_2 + \cdots + a_{2,n}x_n = b_2 \\
\qquad \vdots \\
a_{m,1}x_1 + a_{m,2}x_2 + \cdots + a_{m,n}x_n = b_m
\end{cases}
$$

这是一个齐次线性方程组
$$
\begin{cases}
a_{1,1}x_1 + a_{1,2}x_2 + \cdots + a_{1,n}x_n = 0 \\
a_{2,1}x_1 + a_{2,2}x_2 + \cdots + a_{2,n}x_n = 0 \\
\qquad \vdots \\
a_{m,1}x_1 + a_{m,2}x_2 + \cdots + a_{m,n}x_n = 0
\end{cases}
$$

齐次线性方程组一定有解，至少存在有零解。若 $m<n$ 则一定有非零解。

## 1.2矩阵

**定义** $\text{设}m,n\le1,\text{且设}\mathbb{F}\text{是一个数域}$

$\text{由}\mathbb{F}\text{中}m \cdot n \text{个数}a_{i,j}(i=1,2,\dots m \quad j=1,2,\dots,n)\text{构成矩阵图表}$

$
\qquad \qquad
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
\qquad \text{或} \qquad
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
$

$\text{称为数域}\mathbb{F}\text{上的}m\text{行}n\text{列矩阵}(matrix)\text{，简称为} m\times n\text{矩阵。特别地，若}m=n\text{称为方阵，称为}n\text{阶方阵}$

$\text{通常用大写字母}A,B,C,\dots \text{表示矩阵} \; \text{例如}A=(a_{i,j})_{m\times n}=(a_{i,j})\text{当上下文清楚时可以省略}m \times n$

记
$
\begin{aligned}
M_{m\times n}(\mathbb{F}) &= \{A=(a_{i,j})_{m\times n}\mid a_{i,j}\in \mathbb{F}\}\\
                          &= \mathbb{F}^{m\times n}
\end{aligned}
\qquad M_{n\times n}(\mathbb{F}) = M_{n}(\mathbb{F})
$

由线性方程组$(*)$得到两个矩阵

$$
A=(a_{i,j})_{m\times n}\text{，}\tilde{A}=\left(
  \begin{matrix}
    {\Large A} & \begin{matrix} b_1 \\ \vdots \\ b_m \end{matrix}
  \end{matrix}
\right)
\in M_{m \times n+1}(\mathbb{F})
$$
$$A\text{称为系数矩阵}(coefficient\;matrix)\text{，}\tilde{A}\text{称为增广矩阵}(augmented\;matrix)$$

与线性方程组的初等变换类似，可以对系数矩阵(增广矩阵)作如下变换:

1. 交换两行位置
2. 用一个非$0$的数乘以某一行
3. 将某一行乘以$k$加到某一行上

称上面的三种变换称为矩阵的初等变换 $(elementary\;row\;transformation/operation)$，类似地有初等列变换 $(elementary\;column\;transformation/operation)$

## 1.3向量空间

$n\text{维向量空间称为}\mathbb{F}^n$

**向量**：具有大小和方向的量n

**定义**：设 $n \le 1,\mathbb{F}\text{是一个数域，由}\mathbb{F}\text{中的}n\text{个数}a_1,a_2,\dots,a_n\text{构成的有序数组。}\alpha =(a_1,a_2,\dots,a_n)\text{称为}\mathbb{F}\text{上的}n\text{维}(\text{行})\text{向量}$

$$\text{记}\mathbb{F}=\{(a_1,a_2,\dots,a_n)\mid a_1,a_2,\dots,a_n\in\mathbb{F}\}$$

$$
\text{有时为了表达方便，会考虑n维列向量}\quad
\alpha=
\begin{pmatrix}
  a_1 \\
  a_2 \\
  \vdots \\
  a_n
\end{pmatrix}
\text{，其中}a_i\in\mathbb{F}
$$

**向量和线性方程组**

$$
A=
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
\qquad
$$
$$
{\alpha}_i=(a_{i,1},a_{i,2},\dots,a_{i,n})\text{称为}A\text{的第}i\text{行向量}
$$
$$
{\beta}_j=\begin{pmatrix}a_{1,j}\\ a_{2,j}\\ \vdots \\ a_{m,j}\end{pmatrix}\text{称为}A\text{的第}j\text{列向量}
$$
可见
$$
A=\begin{pmatrix} {\alpha}_1 \\ {\alpha}_2 \\ \vdots \\ {\alpha}_m \end{pmatrix}=({\beta}_1,{\beta}_2,\dots,{\beta}_n)
$$
$$
\tilde{A}=({\beta}_1,{\beta}_2,\dots,{\beta}_n,{\beta})
$$

由此，线性可以表示为

$${\beta}_1x_1+{\beta}_2x_2+\dots+{\beta}_nx_n={\beta}$$
现在考虑$(*)$是否有解。现在可以这样表述：

$$(*)\text{有解，当且仅当其常数项组成的列向量是其未知量系数组成的}n\text{个}m\text{维列向量的倍数的和}$$

**定义**

$$ \text{设} {\alpha}_1,{\alpha}_2,\dots,{\alpha}_s\in \mathbb{F}^n(n\text{维向量})\; k_1,k_2,\dots,k_s\in \mathbb{F}$$

$$\text{称}k_1{\alpha}_1+\dots+k_s{\alpha}_s\text{称为}{\alpha}_1,\dots,{\alpha}_s \text{的一个线性组合}(linear\;combination)$$

$$\text{设} {\alpha}_1,{\alpha}_2,\dots,{\alpha}_s,{\alpha}\in \mathbb{F}^n$$

$$\text{若}{\alpha}=k_1{\alpha}_1+k_2{\alpha}_2+\dots+k_s{\alpha}_s \text{则称} {\alpha} \text{可用} {\alpha}_1,\dots,{\alpha}_s \text{线性表示}$$

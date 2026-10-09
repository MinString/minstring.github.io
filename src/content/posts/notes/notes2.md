---
title: 学习笔记2
published: 2026-10-09
description: '数学分析的学习笔记'
image: ''
tags: ['学习笔记','数学分析']
category: '学习笔记'
draft: false
lang: 'zh_CN'
---

## Weierstrass定理（单调有界数列必收敛）

证明：
设$\{a_n\}$单调递增且有界。记$X=\{a_n | n \in \mathbb{N}\}$为由此数列构成的集合,$\alpha = \sup X$，则对于任意给定的 $\varepsilon > 0 $，由集合上界的定义(上确界是最小的上界)可知，存在 $N\in \mathbb{N}$使得
$$ \alpha - \varepsilon < a_N $$
由于$\{a_n\}$是单调递增的，故当 $n>N$时有
$$ \alpha - \varepsilon <a_N \le  a_n \le \alpha < \alpha + \varepsilon$$

## 闭区间套原理

### 定理内容

设有一列闭区间 $[a_n,b_n],n \ge 1,a_n\ne b_n$，满足条件
$$ [a_1,b_1]\supsetneq[a_2,b_2]\supsetneq \dots$$
并且有
$$ \lim_{n \to \infty}(a_n-b_n)=0 $$
则存在唯一的实数 $\gamma$使得
$$ \gamma \in \bigcap_{n=1}^{\infty}[a_n,b_n]$$

### 证明

**证明：**
考虑数列 $\{a_n\}$ $\{b_n\}$，他们分别是单调递增、单调递减的有界数列,记他们的极限分别为$a,b$,由于 $a_n<b_n$，我们有
$$ a_n\le a \le b \le b_n$$
由于
$$ \lim_{n \to \infty}(a_n-b_n)=0$$
故$$a=b$$。取$\gamma=a$，则满足定理要求。

**注1** 去掉闭区间的条件则不再成立

**注2** 利用闭区间套原理可以证明确界原理(我还不会)

## 自然对数的底

### 定义1

有 $a_n=(1+\frac{1}{n})^n$
$$a_n=1 \cdot (1+\frac{1}{n})^n <(\frac{1+n \cdot(1+\frac{1}{n})}{n+1})^{n+1}=(1+\frac{1}{n+1})^{n+1}=a_{n+1}$$
$$\frac{1}{4}a_n=\frac{1}{2}\cdot\frac{1}{2}(1+\frac{1}{n})^n\le (\frac{\frac{1}{2}+\frac{1}{2}+n \cdot(1+\frac{1}{n})}{n+2})^{n+2}=1$$
因此$a_n$单调有界，故他收敛。记

$$\lim_{n\to\infty}a_n=e$$

### 定义2

考虑数列$\{S_n\}$，其中
$$S_n=1+1+\frac{1}{2!}+\frac{1}{3!}+\dots+\frac{1}{n!}=\sum^n_{k=0}\frac{1}{k!}\;\text{(其中0! =1)}$$
$$S_n \le 1+ 1+\frac{1}{1\cdot2}+\frac{1}{2\cdot3}+\frac{1}{3\cdot4}\dots+\frac{1}{(n-1)\cdot n}=3-\frac{1}{n} \le 3$$
$\{S_n\}$单调递增且有界，因此他收敛，记
$$\lim_{n\to\infty}S_n=e$$

**注意** 我们还需要证明

$$\lim_{n\to\infty}S_n=\lim_{n\to\infty}a_n$$

## 基本列Cauchy收敛原理

### 基本列定义

$$\forall \varepsilon>0,\exist N\in \mathbb{N},s.t. \forall m,n>N \text{有} |a_n-a_m|<\varepsilon$$
或另一个等价写法
$$\forall \varepsilon>0,\exist N\in \mathbb{N},s.t. \forall n>N,p\in\mathbb{N} \text{有} |a_{n+p}-a_n|<\varepsilon$$

### 有限覆盖定理(Heine-Borel定理,Borel-Lebesgue定理)

**定理内容：**
闭区间的任意一个开覆盖必有有限子覆盖

**证明：**
考虑使用反证，现存在一个闭区间$X=[a,b]$这个闭区间有一个开覆盖$S=\{I_\lambda\}_{\lambda\in\Lambda}$，假设这个开覆盖没有有限子覆盖。考虑设$J_0=[a,b]$，将$[a,b]$分成两个区间$[a,\frac{a+b}{2}],[\frac{a+b}{2},b]$，由于这个闭区间没有有限子覆盖，那么这两个区间中至少有一个没有有限子覆盖，记这个区间为$J_1$，用这样的方式可以一直分下去，最终得到
$$J_n\subsetneq J_{n-1}\subsetneq ... \subsetneq J_1 \subsetneq J_0\;\;\;\text{其中}|J_n|=\frac{b-a}{2^n}$$
由闭区间套原理可知存在唯一的$\gamma\in X$满足
$$\gamma \in\bigcap^{\infty}_{k=0}J_k$$

那么由于$\gamma\in X$且$I_\lambda$是开集，所以一定存在$\varepsilon>0,\lambda_0$使得$(\gamma-\varepsilon,\gamma+\varepsilon)\subseteq I_{\lambda_0}$，由于$|J_n|\to0$，则存在$N\in\mathbb{N}$使得 $\forall n>N$时，有$|J_n|<\varepsilon$且$\gamma\in J_n\Rarr J_n\subseteq I_{\lambda_0}$，这就意味着我们所假设的无限个无法被有限个子覆盖覆盖的$J_n$被一个的开区间覆盖了，这与我们的假设矛盾。$\Box$

**注** $I_\lambda$是一个开集不一定是一个单独的开区间
<!-- 那么由于$\gamma\in X$则存在一个 $\lambda_0\in\Lambda$ 使得$\gamma \in I_{\lambda_0}$,不妨换一个表达方式令$I_{\lambda_0}=(\alpha,\beta)$，令$\delta=min\{\gamma-\alpha,\beta-\gamma\}$，对于这些区间$J$必然存在$N$使得任意的$n>N$有$|J_n|<\delta$那么又由于 $\forall n\in\mathbb{N},\gamma\in J_n$ 当 $|J_n|<\delta$时，有$J_n\subseteq I_{\lambda_0}$，这表明$n>N$时，我们所假设的无限个无法被有限个子覆盖覆盖的$J_n$被有限的开区间覆盖了，这与我们的假设矛盾。$\Box$ -->

### Bolazno-Weiestrass定理(波尔查诺–魏尔斯特拉斯定理)

**定理内容：** 有界数列必有收敛子列

**证明：**
先设有一个数列$\{a_n\}$，有一个闭区间$[a,b]$使得
$$ A=\{a_n|n\in\mathbb{N}\}\subseteq[a,b]$$
如果$A$为有限集那么根据鸽巢原理，一定存在某个数出现了无数次，那么可以知道这个数可以对应一个收敛子列。那么现在考虑$A$为无限集。

---

施工中🚧

---

## 一些习题

### 作业1.2.6

**题目：** 设数列 $a_n$ 满足
$$\lim_{n\to\infty}\frac{a_n}{n}=0$$
求证
$$\lim_{n\to\infty}\frac{max\{a_1,a_2,\dots,a_n\}}{n}=0$$

**证明：**
$$\lim_{n\to\infty}\frac{a_n}{n}=0 \;\;\Rarr\;\;\ \forall \varepsilon>0,\exist N_1\in \mathbb{N}\;s.t. \;\forall n>N_1\text{有}|\frac{a_n}{n}|< \varepsilon $$

令
$$M=max\{a_1,a_2,\dots,a_{N_1}\}$$
则
$$\exist N_2\in\mathbb{N}\;s.t.\;\forall n>N_2,\frac{M}{n}<\varepsilon$$
令
$$N=max\{N_1,N_2\}$$
对于$n>N$时$\frac{max\{a_1,a_2,\dots,a_n\}}{n}$的大小，考虑$a_k$其中 $k\le n$

情形一 $k\le N_1$
$$|\frac{a_k}{n}|\le|\frac{M}{n}|\le\varepsilon$$
情形二 $N_1<k\le n$

由于
$$ \forall \varepsilon>0,\exist N_1\in \mathbb{N}\;s.t. \;\forall n>N_1\text{有}|\frac{a_n}{n}|< \varepsilon $$
故
$$|\frac{a_k}{n}|\le\varepsilon$$

综上所述
$$\forall n>N, k\le n,|\frac{a_k}{n}|<\varepsilon$$
故
$$\forall \varepsilon>0 \;\exist N \;s.t.\; \forall n>N , |\frac{max\{a_1,a_2,\dots,a_{N_1}\}}{n}|<\varepsilon \;\Box$$

**思路分析：**

考虑将 $max\{a_1,a_2...,a_n\}$ 分成两部分$a_1,...,a_N,...,a_n$，前一半放缩为常数比$n$即 $\frac{M}{n}$ 的形式，一定小于$\varepsilon$，之后的有$\frac{a_k}{n}<\varepsilon$则整体的max小于$\varepsilon$，得证。

### 作业1.2.5

**题目：** 证明数列$\{(-1)^n+\frac{2}{n}\}$发散

**思路分析：**

考虑分奇偶项，奇偶极限不同故数列发散。

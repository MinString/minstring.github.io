---
title: 学习笔记3
published: 2026-10-15
description: '高等线性代数第四次作业'
image: ''
tags: ['学习笔记','高等线性代数']
category: '学习笔记'
draft: false
lang: 'zh_CN'
---

其实是作业。第一次这样干，把作业写完然后用 LaTeX 打一遍，力竭了，以后这事谁爱干谁干，我是不会再这样写作业了。

# 高等线性代数 作业 4

## 4.1

对系数矩阵进行初等行变换：

$$
\begin{pmatrix}
1 & 2 & 1 & -1 & 0 \\
2 & 4 & 5 & -3 & -1 \\
-1 & -1 & -3 & 3 & 42
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1 & 2 & 1 & -1 & 0 \\
0 & 0 & 3 & -1 & -1 \\
0 & 1 & -2 & 2 & 42
\end{pmatrix}
$$

$$
\longrightarrow
\begin{pmatrix}
1 & 2 & 1 & -1 & 0 \\
0 & 1 & -2 & 2 & 42 \\
0 & 0 & 3 & -1 & -1
\end{pmatrix}
\longrightarrow
\begin{pmatrix}
1 & 0 & 0 & -\frac{10}{3} & -\frac{247}{3} \\
0 & 1 & 0 & \frac{4}{3} & \frac{124}{3} \\
0 & 0 & 1 & -\frac{1}{3} & -\frac{1}{3}
\end{pmatrix}
$$

由此可得同解方程组：

$$
\begin{cases}
x_1 &= \frac{10}{3}x_4 + \frac{247}{3}x_5 \\
x_2 &= -\frac{4}{3}x_4 - \frac{124}{3}x_5 \\
x_3 &= \frac{1}{3}x_4 + \frac{1}{3}x_5
\end{cases}
$$

分别令自由未知量 $(x_4, x_5) = (1, 0)$ 和 $(x_4, x_5) = (0, 1)$，得到基础解系：

$$
\eta_1 = \begin{pmatrix}
\frac{10}{3} \\
-\frac{4}{3} \\
\frac{1}{3} \\
1 \\
0
\end{pmatrix},
\qquad
\eta_2 = \begin{pmatrix}
\frac{247}{3} \\
-\frac{124}{3} \\
\frac{1}{3} \\
0 \\
1
\end{pmatrix}
$$

## 4.2

**证明：**

对于线性空间 $W \subseteq \mathbb{F}^n$，任取其一组基 $\alpha_1, \alpha_2, \dots, \alpha_r \in \mathbb{F}^n$，其中 $r = \dim(W)$。构造矩阵：

$$
A =
\begin{pmatrix}
\alpha_1 \\
\alpha_2 \\
\vdots \\
\alpha_r
\end{pmatrix}
=
\begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{r1} & a_{r2} & \cdots & a_{rn}
\end{pmatrix}
$$

因为 $\alpha_1, \alpha_2, \dots, \alpha_r$ 线性无关，所以 $\operatorname{rank}(A) = r$。

对于一个解空间 $W^*$，由于 $\forall \eta_1, \eta_2 \in W^*$，有 $\eta_1 + \eta_2 \in W^*$ 且 $\forall k \in \mathbb{F},\ k\eta_1 \in W^*$。故对 $A$ 进行初等行变换得到的矩阵 $A'$，其每一行向量组成的行空间不变。

不妨设经过初等行变换（及必要的列交换）后，简化阶梯形矩阵为：

$$
A \longrightarrow A' =
\begin{pmatrix}
1 & 0 & \cdots & 0 & b_{1,r+1} & \cdots & b_{1n} \\
0 & 1 & \cdots & 0 & b_{2,r+1} & \cdots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 1 & b_{r,r+1} & \cdots & b_{rn}
\end{pmatrix}
=
\begin{pmatrix}
\alpha'_1 \\
\alpha'_2 \\
\vdots \\
\alpha'_r
\end{pmatrix}
$$

构造方程组 $(*)$ 如下：

$$
(*) \quad
\begin{cases}
x_{r+1} &= b_{1,r+1}x_1 + b_{2,r+1}x_2 + \cdots + b_{r,r+1}x_r \\
x_{r+2} &= b_{1,r+2}x_1 + b_{2,r+2}x_2 + \cdots + b_{r,r+2}x_r \\
&\quad \vdots \\
x_n &= b_{1n}x_1 + b_{2n}x_2 + \cdots + b_{rn}x_r
\end{cases}
$$

易验证 $\alpha'_1, \alpha'_2, \dots, \alpha'_r$ 满足方程组 $(*)$，且是其一组基础解系。由于矩阵初等行变换可逆，$\alpha_1, \dots, \alpha_r$ 与 $\alpha'_1, \dots, \alpha'_r$ 可以互相线性表示，故 $\alpha_1, \dots, \alpha_r$ 也是 $(*)$ 的基础解系，即 $W$ 是该齐次线性方程组的解空间。

## 4.3

对增广矩阵进行初等行变换：

$$
\left(\begin{array}{ccccc|c}
1 & 3 & -1 & 2 & -1 & -4 \\
-3 & 1 & 2 & -5 & -4 & -1 \\
2 & -3 & -1 & -1 & 1 & 4 \\
-4 & 16 & 1 & 3 & -9 & -21
\end{array}\right)
\longrightarrow
\left(\begin{array}{ccccc|c}
1 & 0 & 0 & -27 & -22 & 2 \\
0 & 1 & 0 & -4 & -4 & -1 \\
0 & 0 & 1 & -41 & -33 & 3 \\
0 & 0 & 0 & 0 & 0 & 0
\end{array}\right)
$$

则对应的导出组（齐次线性方程组）与原非齐次线性方程组分别为：

$$
\begin{cases}
x_1 - 27x_4 - 22x_5 &= 0 \\
x_2 - 4x_4 - 4x_5 &= 0 \\
x_3 - 41x_4 - 33x_5 &= 0
\end{cases}
\qquad \text{与} \qquad
\begin{cases}
x_1 - 27x_4 - 22x_5 &= 2 \\
x_2 - 4x_4 - 4x_5 &= -1 \\
x_3 - 41x_4 - 33x_5 &= 3
\end{cases}
$$

取自由变量 $x_4 = x_5 = 0$，得非齐次线性方程组的一个特解：

$$
\gamma_0 = \begin{pmatrix}
2 \\
-1 \\
3 \\
0 \\
0
\end{pmatrix}
$$

对导出组，分别取 $(x_4, x_5) = (1, 0)$ 和 $(0, 1)$，得基础解系：

$$
\eta_1 = \begin{pmatrix}
27 \\
4 \\
41 \\
1 \\
0
\end{pmatrix},
\qquad
\eta_2 = \begin{pmatrix}
22 \\
4 \\
33 \\
0 \\
1
\end{pmatrix}
$$

故原方程组的通解为：

$$
x = \gamma_0 + k_1\eta_1 + k_2\eta_2 \quad (k_1, k_2 \in \mathbb{F})
$$

## 4.4

**证明：**

不妨设 $\gamma_0, \eta_i \in \mathbb{F}^n$，将线性方程组表示为向量形式：

$$
\alpha_1 x_1 + \alpha_2 x_2 + \cdots + \alpha_n x_n = \beta
$$

其导出组为：

$$
\alpha_1 x_1 + \alpha_2 x_2 + \cdots + \alpha_n x_n = 0
$$

设特解 $\gamma_0 = (a_{01}, a_{02}, \dots, a_{0n})^T$，基础解系 $\eta_i = (b_{i1}, b_{i2}, \dots, b_{in})^T \ (i = 1, 2, \dots, s)$。由定义知：

$$
\sum_{k=1}^n a_{0k}\alpha_k = \beta, \qquad \sum_{k=1}^n b_{ik}\alpha_k = 0 \quad (i = 1, 2, \dots, s)
$$

考察向量：

$$
\begin{aligned}
\xi
&= \gamma_0 + k_1\eta_1 + k_2\eta_2 + \cdots + k_s\eta_s \\
&= \left( a_{01} + \sum_{i=1}^s k_i b_{i1}, \ a_{02} + \sum_{i=1}^s k_i b_{i2}, \ \dots, \ a_{0n} + \sum_{i=1}^s k_i b_{in} \right)^T
\end{aligned}
$$

将 $\xi$ 的每一维代入原线性方程组左边，得：

$$
\begin{aligned}
\text{左边}
&= \sum_{j=1}^n \left( a_{0j} + \sum_{i=1}^s k_i b_{ij} \right) \alpha_j \\
&= \sum_{j=1}^n a_{0j}\alpha_j + \sum_{i=1}^s k_i \left( \sum_{j=1}^n b_{ij}\alpha_j \right) \\
&= \beta + \sum_{i=1}^s k_i \cdot 0 \\
&= \beta = \text{右边}
\end{aligned}
$$

故 $\xi = \gamma_0 + \sum_{i=1}^s k_i\eta_i$ 是原方程组的解。证毕。$\Box$

## 4.5

**证明：**

记第一个线性方程组为 $(*)$，第二个线性方程组为 $(\ast\ast)$。设 $A$ 是 $(*)$ 的系数矩阵，$\tilde{A}$ 是 $(*)$ 的增广矩阵；设 $B$ 是 $(\ast\ast)$ 的系数矩阵，$\tilde{B}$ 是 $(\ast\ast)$ 的增广矩阵：

$$
A = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{pmatrix}
$$

$$
\tilde{A} = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{pmatrix}
$$

$$
B = \begin{pmatrix}
a_{11} & a_{21} & \cdots & a_{m1} \\
a_{12} & a_{22} & \cdots & a_{m2} \\
\vdots & \vdots & \ddots & \vdots \\
a_{1n} & a_{2n} & \cdots & a_{mn} \\
b_1 & b_2 & \cdots & b_m
\end{pmatrix}
$$

$$
\tilde{B} = \begin{pmatrix}
a_{11} & a_{21} & \cdots & a_{m1} & 0 \\
a_{12} & a_{22} & \cdots & a_{m2} & 0 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{1n} & a_{2n} & \cdots & a_{mn} & 0 \\
b_1 & b_2 & \cdots & b_m & 1
\end{pmatrix}
$$

不妨将 $B$ 与 $\tilde{B}$ 进行转置得 $C$ 与 $\tilde{C}$，转置后矩阵的秩不变：

$$
C = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m
\end{pmatrix}
$$

$$
\tilde{C} = \begin{pmatrix}
a_{11} & a_{12} & \cdots & a_{1n} & b_1 \\
a_{21} & a_{22} & \cdots & a_{2n} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn} & b_m \\
0 & 0 & \cdots & 0 & 1
\end{pmatrix}
$$

由线性方程组有解的充要条件知：

- $(*)$ 有解 $\Longleftrightarrow \operatorname{rank}(A) = \operatorname{rank}(\tilde{A})$；
- $(\ast\ast)$ 有解 $\Longleftrightarrow \operatorname{rank}(B) = \operatorname{rank}(\tilde{B}) \Longleftrightarrow \operatorname{rank}(C) = \operatorname{rank}(\tilde{C})$。

发现 $C = \tilde{A}$，故 $\operatorname{rank}(C) = \operatorname{rank}(\tilde{A})$。因此只需证明：

$$
\operatorname{rank}(A) = \operatorname{rank}(\tilde{A}) \Longleftrightarrow \operatorname{rank}(\tilde{A}) \neq \operatorname{rank}(\tilde{C})
$$

考虑 $A$ 可以进行初等行变换与不涉及最后一列的初等列变换，化为简化阶梯形 $A'$（其中有 $r$ 个 $1$），同步作用于 $C$（即 $\tilde{A}$）和 $\tilde{C}$：

$$
A \longrightarrow A' =
\begin{pmatrix}
1 & 0 & \cdots & 0 \\
0 & 1 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & 0
\end{pmatrix}
$$

$$
C \longrightarrow C' =
\begin{pmatrix}
A' & \begin{matrix} c_1 \\ \vdots \\ c_m \end{matrix}
\end{pmatrix}
$$

$$
\tilde{C} \longrightarrow \tilde{C}' =
\begin{pmatrix}
A' & \begin{matrix} c_1 \\ \vdots \\ c_m \end{matrix} \\
0 \;\;\cdots\;\; 0 & 1
\end{pmatrix}
$$

记 $r_1 = \operatorname{rank}(A')$，$r_2 = \operatorname{rank}(C')$，$r_3 = \operatorname{rank}(\tilde{C}')$。只需考虑最后一列向量 $(c_1, \dots, c_m)^T$ 的情况：由于 $\tilde{C}'$ 最后一列含非零常数 $1$，故必有 $r_3 = r_1 + 1$。

1. 若 $c_1 = \cdots = c_m = 0$，则 $r_2 = r_1$，此时 $r_2 \neq r_3$（即 $(*)$ 有解时 $(\ast\ast)$ 无解）；

2. 若 $c_1, \dots, c_m$ 中含有 $1$ 个非零元（其余为 $0$），此时 $r_2 = r_1 + 1 = r_3$；

3. 若 $c_1, \dots, c_m$ 不是上述两种情况（即含多个非零元），可通过矩阵初等行变换消元化为情况 2，仍有 $r_2 = r_1 + 1 = r_3$（即 $(*)$ 无解时 $(\ast\ast)$ 有解）。

综上可得 $r_2 = r_1 \Longleftrightarrow r_2 \neq r_3$，故原命题得证。$\Box$

## 4.6

**证明：**

设 $A = (\alpha_1, \alpha_2, \dots, \alpha_n)$，其中 $\alpha_k$ 为 $A$ 的第 $k$ 列向量。令 $C = AB$，其中：

$$
B = \begin{pmatrix}
b_{11} & b_{12} & \cdots & b_{1s} \\
b_{21} & b_{22} & \cdots & b_{2s} \\
\vdots & \vdots & \ddots & \vdots \\
b_{n1} & b_{n2} & \cdots & b_{ns}
\end{pmatrix}_{n \times s}
$$

由矩阵乘法定义，$C$ 的第 $(i, j)$ 元为：

$$
c_{ij} = \sum_{k=1}^n a_{ik} b_{kj}
$$

考察 $C = AB$ 的第 $j$ 列向量 $\gamma_j$：

$$
\begin{aligned}
\gamma_j
&= \begin{pmatrix} c_{1j} \\ c_{2j} \\ \vdots \\ c_{mj} \end{pmatrix}
= \begin{pmatrix} \sum_{k=1}^n a_{1k} b_{kj} \\ \sum_{k=1}^n a_{2k} b_{kj} \\ \vdots \\ \sum_{k=1}^n a_{mk} b_{kj} \end{pmatrix} \\
&= \sum_{k=1}^n b_{kj} \begin{pmatrix} a_{1k} \\ a_{2k} \\ \vdots \\ a_{mk} \end{pmatrix} \\
&= b_{1j}\alpha_1 + b_{2j}\alpha_2 + \cdots + b_{nj}\alpha_n
\end{aligned}
$$

故 $AB$ 的第 $j$ 列向量确为 $b_{1j}\alpha_1 + b_{2j}\alpha_2 + \cdots + b_{nj}\alpha_n$。$\Box$

## 4.7

### (1)

考察基础矩阵 $E_{ij}$ 与 $E_{kl}$ 的乘积：$E_{ij}$ 中仅有第 $(i, j)$ 元为 $1$，其余全为 $0$；在矩阵乘法中，该元素仅与 $E_{kl}$ 中的第 $j$ 行元素产生非零相乘行为。

1. 若 $j = k$，则在乘积矩阵的第 $(i, l)$ 处有 $1 \times 1 = 1$，其余为 $0$，即：

   $$
   E_{ij} \cdot E_{kl} = E_{il}
   $$

2. 若 $j \neq k$，则对应相乘元素均为 $0$，即：

   $$
   E_{ij} \cdot E_{kl} = O
   $$

综上所述：

$$
E_{ij} E_{kl} =
\begin{cases}
E_{il}, & j = k, \\
O, & j \neq k.
\end{cases}
$$

### (2)

1. 若 $i = j$，则 $A$ 任取。

2. 若 $i \neq j$，设 $A = (a_{uv})_{n \times n}$ 与所有 $E_{ij}$ 可交换，即 $E_{ij}A = AE_{ij}$。

   - $E_{ij}A$ 表示将 $A$ 的第 $j$ 行移到第 $i$ 行，其余行全为 $0$，即

     $$
     E_{ij}A =
     \begin{pmatrix}
     0 & 0 & \cdots & 0 \\
     \vdots & \vdots & \ddots & \vdots \\
     a_{j1} & a_{j2} & \cdots & a_{jn} \\
     \vdots & \vdots & \ddots & \vdots \\
     0 & 0 & \cdots & 0
     \end{pmatrix}
     $$
     （其中 $a_{j1}, a_{j2}, \dots, a_{jn}$ 位于第 $i$ 行）；

   - $AE_{ij}$ 表示将 $A$ 的第 $i$ 列移到第 $j$ 列，其余列全为 $0$，即

     $$
     AE_{ij} =
     \begin{pmatrix}
     0 & \cdots & 0 & a_{1i} & 0 & \cdots & 0 \\
     0 & \cdots & 0 & a_{2i} & 0 & \cdots & 0 \\
     \vdots & \ddots & \vdots & \vdots & \vdots & \ddots & \vdots \\
     0 & \cdots & 0 & a_{ni} & 0 & \cdots & 0
     \end{pmatrix}
     $$
     （其中 $a_{1i}, a_{2i}, \dots, a_{ni}$ 位于第 $j$ 列）。

   对比两矩阵的元素可得：如果 $AE_{ij} = E_{ij}A$，则应该满足

   $$
   \begin{aligned}
   & a_{jj} = a_{ii}, \\
   & a_{j1} = a_{j2} = \cdots = a_{j,j-1} = a_{j,j+1} = \cdots = a_{jn} = 0, \\
   & a_{1i} = a_{2i} = \cdots = a_{i-1,i} = a_{i+1,i} = \cdots = a_{ni} = 0.
   \end{aligned}
   $$

## 4.8

**证明：**

设 $A$ 为 $m \times n$ 矩阵，且 $\operatorname{rank}(A) \le 1$。

1. 若 $\operatorname{rank}(A) = 0$，则 $A = O$。此时令 $a_i = b_j = 0 \ (1 \le i \le m, \ 1 \le j \le n)$，显然满足条件。

2. 若 $\operatorname{rank}(A) = 1$，由于行秩等于矩阵的秩，即 $\operatorname{rank}_{\text{row}}(A) = \operatorname{rank}(A) = 1$，故 $A$ 中必存在非零行（不妨设第 $i$ 行不全为 $0$），且其余每一行均可表示为第 $i$ 行的倍数。

   设第 $i$ 行元素表示为 $a_i b_1, a_i b_2, \dots, a_i b_n$（其中 $a_i \neq 0$），则对于任意第 $k$ 行，均存在比例系数 $a_k$，使得第 $k$ 行元素由第 $i$ 行乘 $\frac{a_k}{a_i}$ 得到，由此获得了第 $k$ 行的表示。

   由此得到了 $a_1, \dots, a_m$ 与 $b_1, \dots, b_n$：

   $$
   A = \begin{pmatrix}
   a_1 b_1 & a_1 b_2 & \cdots & a_1 b_n \\
   a_2 b_1 & a_2 b_2 & \cdots & a_2 b_n \\
   \vdots & \vdots & \ddots & \vdots \\
   a_m b_1 & a_m b_2 & \cdots & a_m b_n
   \end{pmatrix}
   $$

   反之，若 $A$ 可写成上述形式，其所有行均为 $(b_1, \dots, b_n)$ 的倍数，故 $\operatorname{rank}(A) \le 1$。证毕。$\Box$

## 4.9

设线性映射 $\phi_A: \mathbb{F}^n \to \mathbb{F}^m, \ \alpha \mapsto A\alpha$。

### (1) 证明：$\phi_A$ 是单射 $\Longleftrightarrow \operatorname{rank}(A) = n$（此时必有 $n \le m$）

对任意 $\beta = (c_1, c_2, \dots, c_m) \in \mathbb{F}^m$，有：

$$
\begin{aligned}
\phi_A \text{ 是单射}
&\Longleftrightarrow \forall \alpha_1 \neq \alpha_2 \in \mathbb{F}^n, \ \phi_A(\alpha_1) \neq \phi_A(\alpha_2) \\
&\Longleftrightarrow \forall \alpha_1 \neq \alpha_2 \in \mathbb{F}^n,\ A\alpha_1 \neq A\alpha_2 \\
&\Longleftrightarrow \text{线性方程组 } Ax = \beta \text{ 若有解则必有唯一解} \\
&\Longleftrightarrow \operatorname{rank}(A) = n
\end{aligned}
$$

### (2) 证明：$\phi_A$ 是满射 $\Longleftrightarrow \operatorname{rank}(A) = m$（此时必有 $m \le n$）

设 $A = (\gamma_1, \gamma_2, \dots, \gamma_n)$，对于 $\alpha = (b_1, b_2, \dots, b_n)^T \in \mathbb{F}^n$，有：

$$
\phi_A(\alpha) = A\alpha = b_1\gamma_1 + b_2\gamma_2 + \cdots + b_n\gamma_n
$$

$$
\begin{aligned}
\phi_A \text{ 是满射}
&\Longleftrightarrow \forall \beta \in \mathbb{F}^m, \ \exists \alpha \in \mathbb{F}^n \text{ 使得 } \phi_A(\alpha) = \beta \\
&\Longleftrightarrow \forall \beta \in \mathbb{F}^m, \ \beta \text{ 可由 } \gamma_1, \gamma_2, \dots, \gamma_n \text{ 线性表出} \\
&\Longleftrightarrow \operatorname{span}\{\gamma_1, \gamma_2, \dots, \gamma_n\} = \mathbb{F}^m \\
&\Longleftrightarrow \dim \operatorname{span}\{\gamma_1, \gamma_2, \dots, \gamma_n\} = m \\
&\Longleftrightarrow \operatorname{rank}(A) = m
\end{aligned}
$$

证毕 $\Box$

## 4.10

### (1) 证明 $K$ 关于矩阵加法和乘法构成一个域

设

$$
K = \left\{ \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \ \middle\vert\ a, b \in \mathbb{R} \right\}
$$

任取

$$
K_1 = \begin{pmatrix} a & -b \\ b & a \end{pmatrix},
\qquad
K_2 = \begin{pmatrix} c & -d \\ d & c \end{pmatrix} \in K
$$

易验证加法和乘法在 $K$ 上封闭。

1. **加法交换律：** $K_1 + K_2 = K_2 + K_1$，显然成立。

2. **加法结合律：** $(K_1 + K_2) + K_3 = K_1 + (K_2 + K_3)$，由矩阵加法性质显然成立。

3. **加法零元：** 定义 $O = \begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix} \in K$，则 $O + K_1 = K_1 + O = K_1$。

4. **加法逆元（负元）：** $\forall K_1 = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \in K$，存在 $-K_1 = \begin{pmatrix} -a & b \\ -b & -a \end{pmatrix} \in K$，使得 $K_1 + (-K_1) = O$。

5. **乘法交换律：**

   $$
   K_1 K_2 = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \begin{pmatrix} c & -d \\ d & c \end{pmatrix} = \begin{pmatrix} ac - bd & -(ad + bc) \\ bc + ad & ac - bd \end{pmatrix}
   $$

   $$
   K_2 K_1 = \begin{pmatrix} c & -d \\ d & c \end{pmatrix} \begin{pmatrix} a & -b \\ b & a \end{pmatrix} = \begin{pmatrix} ca - db & -(cb + da) \\ da + cb & ca - db \end{pmatrix} = K_1 K_2
   $$

6. **乘法结合律：** 由矩阵乘法结合律知成立。

7. **乘法单位元：** $1 = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} \in K$，满足 $K_1 1 = 1 K_1 = K_1$。

8. **乘法逆元：** 对任意 $K_1 = \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \neq O$（即 $a, b$ 不全为 $0$，故 $a^2 + b^2 \neq 0$），存在：

   $$
   K_1^{-1} = \begin{pmatrix} \frac{a}{a^2 + b^2} & \frac{b}{a^2 + b^2} \\ -\frac{b}{a^2 + b^2} & \frac{a}{a^2 + b^2} \end{pmatrix} \in K
   $$

   使得 $K_1 K_1^{-1} = K_1^{-1} K_1 = 1$。

9. **分配律：** 由矩阵乘法对加法的分配律知成立。

综上所述，$K$ 是一个域。

### (2) 证明 $K$ 与复数域 $\mathbb{C}$ 同构

定义映射 $\Phi: K \to \mathbb{C}$：

$$
\Phi\left( \begin{pmatrix} a & -b \\ b & a \end{pmatrix} \right) = a + bi
$$

显然 $\Phi$ 是双射。

- **保持加法：**

  $$
  \Phi(z + w) = \Phi\left( \begin{pmatrix} a + c & -(b + d) \\ b + d & a + c \end{pmatrix} \right) = (a + c) + (b + d)i
  $$

  $$
  \Phi(z) + \Phi(w) = (a + bi) + (c + di) = (a + c) + (b + d)i
  $$

  $$
  \implies \Phi(z + w) = \Phi(z) + \Phi(w)
  $$

- **保持乘法：**

  $$
  \Phi(zw) = \Phi\left( \begin{pmatrix} ac - bd & -(ad + bc) \\ bc + ad & ac - bd \end{pmatrix} \right) = (ac - bd) + (ad + bc)i
  $$

  $$
  \Phi(z)\Phi(w) = (a + bi)(c + di) = (ac - bd) + (ad + bc)i
  $$

  $$
  \implies \Phi(zw) = \Phi(z)\Phi(w)

  $$

得证 $\Box$

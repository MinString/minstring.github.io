---
title: 完全做不到的weekly2
published: 2026-09-27
description: '很难周更了，看看这几天都干了什么吧'
image: ''
tags: [随笔]
category: '随笔'
draft: true
lang: 'zh_CN'
---

好的好的，发现了，周更是很困难的了，

## 军训结束，学习高数，自寻死路，连滚带爬，滚入迷雾

~~其实学习的是数分高代，只是发现高数押韵hhh，乱押韵还比较有趣欸~~

军训结束了，那么回顾一下军训期间都干了什么吧。训练、休息、玩、考核。嗯，到现在已经有些淡忘了。军训里最难忘的或许是《战士》(《爱军习武歌》)，感觉战士/站士、坐士是最大的梗。还有呢，我们教官非常的好啊，也姓聂hhhh。那军训就到此结束吧。感觉军训时候时间不是自己安排的，剩下了较少的自由时间，但是呢，这些较少的时间比之后的大量自主安排时间剩下出来的要多出来不少。

军训结束了，那就要开始正式上课了。我们第一学期的学分并不多，限制是不多于22学分，我也选了22学分，除了那些大一的必修课，我还选了程序设计基础和环境与大数据（一门新生研讨课）。虽然感觉课不多，但是事情好多啊。尤其是数学课，两门一共9学分，感觉可以跟30学分去对抗。老师讲课也是足够诡异了，举个例子： $ f: X \times X \to X , (x,y) \mapsto x \cdot y$ 怎么说呢，其实是比较正常的，但是奈何我太弱了，我去理解这个式子到底在干什么，花了半个多小时。大多数的内容都是用课下时间去理解，突然感觉上课可以不经常去（雾）。然后就是写作与沟通课，这个超级头疼，写作嘛，其实是挺喜欢的，写论文其实也有吸引了，可惜了，误入了`《史记》与司马迁`这个主题，《史记》是难以读进去呀，不过幸好有现代人注释版本以及AI，我能够理解些。好了好了，这就是学业上，总之呢，学业上是很难绷的，强基计划的强度还是太大了，课业压力是比较大的。

## 忙里偷闲

不管怎么说，总还是能够有(一些)自主时间的，那就来总结一下最近干了什么吧。

### 尝试码

学习了高斯消元法之后，我有一天晚上拼尽全力码一个高斯消元法，感觉自己算是已经老了，写了三个小时才写好这个东西，不过有个好处，就是我很长一段时间不会忘记高斯消元法的步骤了。

```cpp collapse={1-173}
#include <iostream>
#include <cstdio>
#include <cmath>
#include <algorithm>
#include <vector>

using namespace std;

namespace Gauss
{
    const int N = 1e3+114, M = 1e3+114;
    int n, m;
    double a[N][M], b[M];

    void display();
    void input();
    // void swap(double &X, double &Y);
    void swap_equations(int x, int y);
    int fnd(int x, int r);
    void eliminate(int r, int x, int k);
    void normalize(int x, int r);
    void calc();

    void input()
    {
        printf("请你输入两个数据，分别表示方程未知数的个数和方程个数(要求均小于10,000)\n");
        scanf("%d%d", &n, &m);
        printf("请你再输入%d个方程的所有未知数的系数和常数\n,要求有%d横行,每行有%d个数字\n", m, m, n + 1);
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                scanf("%lf", &a[i][j]);
            }
            scanf("%lf", &b[i]);
        }
        // display();
    }

    void swap(double &X, double &Y)
    {
        double Z;
        Z = X, X = Y, Y = Z;
    } // swap single element

    void swap_equations(int x, int y)
    {
        if (x == y)
            return;
        for (int j = 1; j <= n; j++)
        {
            swap(a[x][j], a[y][j]);
        }
        swap(b[x], b[y]);
    } // swap equations

    int fnd(int x, int r)
    {
        for (int i = r + 1; i <= m; i++)
        {
            if (fabs(a[i][x]) > 1e-12)
            {
                return i;
            }
        }
        return 0;
    }

    void eliminate(int r, int x, int k)
    {
        if (a[k][x] != 0)
        {

            double p = a[k][x] / a[r][x];
            for (int j = x; j <= n; j++)
            {
                a[k][j] -= a[r][j] * p;
            }
            b[k] -= b[r] * p;
        }
        else
        {
            return;
        }
    } // 方程r 未知数x 消除方程k

    void normalize(int x, int r)
    {
        for (int j = x + 1; j <= n; j++)
        {
            a[r][j] /= a[r][x];
        }
        b[r] /= a[r][x];
        a[r][x] = 1;
    }

    void calc()
    {
        int r = 0;
        for (int x = 1; x <= n; x++)
        {
            // x-> 第x个未知数  r->第r个方程

            int t = fnd(x, r);
            if (t != 0)
            {
                r++;
                // display();
                // cout << "\n\n\n";
                swap_equations(r, t);
                // display();
                // cout << "\n\n\n";

                normalize(x, r);
                // display();
                // cout << "\n\n\n";

                for (int k = r + 1; k <= m; k++)
                {
                    eliminate(r, x, k); // 方程r 未知数x 消除方程k
                    // display();
                    // cout << "\n\n\n\n\n";
                }
            }
            if (t == 0)
            {
                continue;
            }
            if (x == n)
            {
                normalize(x, r);
                for (int i = r; i >= 1; i--)
                {
                    int j = 1;
                    for (; j <= n; j++)
                        if (fabs(a[i][j]) >= 1e-12)
                            break;

                    for (int k = i - 1; k >= 1; k--)
                    {

                        eliminate(i, j, k); // 方程i 未知数j 消除方程k
                    }
                    // display();
                }
            }
        }

        display();
    }

    void display()
    {
        for (int i = 1; i <= m; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                printf("%.2lf\t", a[i][j]);
            }
            printf("%.2lf\n", b[i]);
        }
        putchar('\n');
    }

}

int main()
{
    Gauss::input();
    Gauss::calc();
    return 0;
}

```

### 网络发现

有一次系统更新之后，我的flclash更新了，这次更新不得了，我的代理直接坏掉了，出现了如代理。于是我便回到了clash-verge-rev。如果事情的到这里就结束了，那么我就不会有什么发现了。详情我会写在另一篇文里面。感觉折腾了一次，算是了解了很多东西。

### 军训2.0？

我加入了清华大学国旗仪仗队。

### 脚本刷成绩？

### 实时字幕？

### 第一次漫展！好耶

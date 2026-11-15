# 报告：`Cannot find module 'astro:assets'` / 构建时 fsevents、lightningcss 报错

日期：2026-11-15
项目路径：`/run/media/minstring/DATA/minstring.github.io`

## 结论（TL;DR）

**不是 Astro 配置或代码写错了，而是项目所在的 NTFS 分区以 `ads` 选项挂载导致的。**

ntfs3 的 `ads` 把路径里的冒号解释成 NTFS 备用数据流（Alternate Data Stream）语法，于是 Node/Vite 解析
虚拟模块 `astro:assets` 时，会在 `node_modules/.pnpm/.../node_modules/` 下面“找到”一个名为 `astro:assets`
的包（实际是 `astro` 目录本身），从而把虚拟模块错误解析成真实的 astro 包。

- 构建时：Astro 自身（`astro/dist/content/runtime.js` 中的 `import("astro:assets")`）连带 Vite / Rollup
  一起被拖进 SSR 打包图，报 `fsevents`、`lightningcss` 的 `../pkg` 等一连串解析错误。
- 开发时：`[ERROR] Cannot find module 'astro:assets' imported from '.../ImageWrapper.astro'`。

## 证据

挂载信息：

```
/dev/nvme0n1p4 on /run/media/minstring/DATA type ntfs3 (rw,nosuid,nodev,relatime,uid=1000,gid=1000,acl,
iocharset=utf8,prealloc,ads,uhelper=udisks2)
```

在 `.pnpm` 真实包目录（`astro` 是真实目录，不是软链）里：

```
$ P=node_modules/.pnpm/astro@5.18.2_.../node_modules
$ stat "$P/astro:assets/package.json"      # 成功！内容就是 astro 包的 package.json
$ ls "$P/astro:assets"                     # 列出的就是 astro 包的内容
```

而项目根目录的 `node_modules/astro:assets` 是 ENOENT（因为 `node_modules/astro` 是软链，ADS 查找不穿透软链）。
所以只要你从 `.pnpm` 内部开始做 Node 解析，就会命中这个“假包”。

在构建日志中也能直接看到解析被劫持：

```
[debug-pre] "astro:assets" <- ".../astro/dist/content/runtime.js"
[debug-pre] "./core/index.js" <- ".../node_modules/astro:assets/dist/index.js"
```

即 `astro:assets` 被解析成了 `<astro 包>/dist/index.js`（`astro:assets/dist/index.js` 这个拼接路径）。

## 为什么 `astro.config.mjs` 里的临时补丁不够

上一次会话在 `astro.config.mjs` 里加了两处未提交的临时改动：

1. `vite.plugins` 里 `enforce: "pre"` 的插件，把 `astro:assets` 提前解析为 `\0astro:assets`；
2. `build.rollupOptions.external: ["fsevents"]`。

第 2 条只是把症状往后推（还会继续撞 lightningcss 等）。
第 1 条理论上能挡住 `vite:resolve` 的 node 解析，但 dev 仍然报了 `Cannot find module 'astro:assets'`，
属于“在错误的层面上打补丁”：只要项目还在带 `ads` 的 NTFS 上，任何新出现的 `xxx:yyy` 形式的虚拟模块/路径
都可能再次被误解析，而且不同工具（Vite 构建、dev SSR、其他 Node 工具）的解析路径不完全一致。

## 推荐修法：把项目迁到 ext4（家目录）

已确认选择：整个仓库迁到 `~/minstring.github.io`（`/home` 有 74G 空闲，项目本体约 771M）。

### 步骤

1. 迁移前准备（保留未提交内容，丢弃临时补丁）
   ```bash
   git status                                  # 确认 weekly3.md / weekly3 图片
   git checkout -- astro.config.mjs            # 只回退临时补丁到 HEAD（保留已提交的 KaTeX alias）
   ```
2. 先复制、不删源（`node_modules` 不复制，到新位置重装）
   ```bash
   rsync -a --info=progress2 --exclude node_modules \
     /run/media/minstring/DATA/minstring.github.io/ ~/minstring.github.io/
   ```
3. 在新位置重建依赖
   ```bash
   cd ~/minstring.github.io
   rm -rf node_modules .astro dist
   pnpm install --frozen-lockfile
   ```
   - 旧 pnpm store 在 `/run/media/minstring/DATA/.pnpm-store/v11`（内容寻址目录，不涉及包名，本身无 ADS 问题）；
     项目到 ext4 后 pnpm 会使用/创建家目录下的 store。
   - 项目 `.npmrc` 里有 `manage-package-manager-versions = true`，会自动使用 package.json 固定的 pnpm 9.14.4。
4. 验证（关键是第一条）
   ```bash
   stat node_modules/.pnpm/astro@*/node_modules/astro:assets   # 期望 ENOENT（旧位置上是能访问的）
   pnpm dev                                                    # 首页 + /posts/weekly3/
   pnpm build                                                  # astro build + pagefind
   ```
   期望：不再出现 `Cannot find module 'astro:assets'`、`fsevents`、`lightningcss ../pkg`；
   `dist/posts/weekly3/index.html` 与 `dist/pagefind/` 正常生成。
5. 收尾
   - 新位置一切正常后再删除源目录：
     ```bash
     rm -rf /run/media/minstring/DATA/minstring.github.io
     ```
   - 在 IDE / Claude Code 里把工作目录切到 `~/minstring.github.io`。
   - Git 远程与 Vercel 配置不受路径影响；迁移后提交 weekly3 新文章与图片即可。

## 备选方案（未采用，供参考）

| 方案 | 优点 | 缺点 |
| --- | --- | --- |
| `sudo mount -o remount,ads=0 /run/media/minstring/DATA` | 不动项目，系统级一次解决 | 需要 sudo；默认不会持久化，重启/重挂载后要重做（可写 /etc/fstab） |
| 只把 `node_modules` 放到 ext4 再软链回来 | 项目仍留在 DATA 盘 | 非标准用法，`pnpm install` 可能覆盖软链 |
| 保留 `astro.config.mjs` 预解析插件 | 不迁移目录 | dev 仍未解决，且只对 `astro:assets` 有效，脆弱 |

## 附注

- 这次更换文件系统后，`astro.config.mjs` 中的两处临时改动都不需要了：`fsevents` external 的根因消失，
  预解析插件也失去意义，应回到 HEAD 的干净配置。
- 如果以后又想在这块 NTFS 盘上跑 Node 项目，建议记住这个坑：**任何 `name:stream` 形式的模块 id 都可能被
  ntfs3 的 `ads` 语义吞掉**，最省事的做法是让 `node_modules` 待在 ext4 分区上。

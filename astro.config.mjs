import { createRequire } from "node:module";
import path from "node:path";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components"; /* Render the custom directive content */
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive"; /* Handle directives */
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

/*
 * rehype-katex 渲染公式时用的是它自己依赖的 katex（当前 0.16.x），而项目里直接安装的 katex（0.18.x）
 * 把字号相关的类名从 `.sizing` 改成了 `.katex-sizing`，导致 0.18 的 katex.css 里的字号规则全部匹配不上
 * （最明显的现象就是公式的下标、上标、分数里的字与正文一样大）。
 * 这里按渲染端解析出 CSS 路径，让样式与真正产出 HTML 的 katex 版本保持一致。
 */
const require = createRequire(import.meta.url);
let katexCssPath = "katex/dist/katex.css";
try {
	const rehypeKatexEntry = require.resolve("rehype-katex");
	katexCssPath = require.resolve("katex/dist/katex.css", {
		paths: [path.dirname(rehypeKatexEntry)],
	});
} catch {
	console.warn(
		"[astro.config] 无法解析 rehype-katex 依赖的 katex，回退到项目内的 katex.css，公式字号可能与渲染端不匹配",
	);
}

// https://astro.build/config
export default defineConfig({
	site: "https://minstring.vercel.app/",
	base: "/",
	trailingSlash: "always",
	output: "static",

	integrations: [
		tailwind({
			nesting: true,
		}),
		swup({
			theme: false,
			animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
			// the default value `transition-` cause transition delay
			// when the Tailwind class `transition-all` is used
			containers: ["main", "#toc"],
			smoothScrolling: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
		}),
		icon({
			include: {
				"preprocess: vitePreprocess(),": ["*"],
				"fa6-brands": ["*"],
				"fa6-regular": ["*"],
				"fa6-solid": ["*"],
			},
		}),
		expressiveCode({
			themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: {
						showLineNumbers: false,
					},
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.75rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
					editorTabBarBackground: "var(--codeblock-topbar-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
		svelte(),
		sitemap(),
	],

	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkReadingTime,
			remarkExcerpt,
			remarkGithubAdmonitionsToDirectives,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						note: (x, y) => AdmonitionComponent(x, y, "note"),
						tip: (x, y) => AdmonitionComponent(x, y, "tip"),
						important: (x, y) => AdmonitionComponent(x, y, "important"),
						caution: (x, y) => AdmonitionComponent(x, y, "caution"),
						warning: (x, y) => AdmonitionComponent(x, y, "warning"),
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [
							{
								type: "text",
								value: "#",
							},
						],
					},
				},
			],
		],
	},

	vite: {
		plugins: [
			{
				// 项目放在 NTFS（ntfs3，带 ads 选项）分区上时，`astro:assets` 会被当成
				// `astro` 的备选数据流，Node 的包解析会误判存在名为 `astro:assets` 的包，
				// 从而把 astro 主入口、Vite、Rollup 全部拖进 SSR 构建（表现为 fsevents、
				// lightningcss 的 ../pkg 等一连串解析错误）。Astro 的 astro:assets 插件
				// 没有 enforce: "pre"，会在 Vite 的 node 解析之后才执行，所以在这里提前
				// 把它解析成 Astro 自己的虚拟模块。
				name: "astro-assets-virtual-module-first",
				enforce: "pre",
				resolveId(source) {
					if (source === "astro:assets") {
						return "\0astro:assets";
					}
				},
			},
		],
		resolve: {
			alias: {
				// 见文件顶部说明：让 KaTeX 的 CSS 与 rehype-katex 实际使用的版本一致，否则公式字号规则失效
				"katex/dist/katex.css": katexCssPath,
			},
		},
		build: {
			rollupOptions: {
				// fsevents 是 Rollup 的 macOS-only 可选依赖，pnpm 在 Linux 上不会安装它；
				// 而 Rollup 的 ESM 入口会被 SSR 构建带进来，不标 external 会让构建直接失败。
				external: ["fsevents"],
				onwarn(warning, warn) {
					// temporarily suppress this warning
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					warn(warning);
				},
			},
		},
	},

	adapter: vercel(),
});

<script lang="ts">
	import I18nKey from "@i18n/i18nKey";
	import { i18n } from "@i18n/translation";
	import { onMount } from "svelte";

	let {
		envId = "",
		lang = "zh-CN",
	}: {
		envId: string;
		lang?: string;
	} = $props();

	const TWIKOO_DARK_STYLE_ID = "twikoo-theme-adapt-style";

	function injectTwikooThemeStyle() {
		if (document.getElementById(TWIKOO_DARK_STYLE_ID)) return;

		const style = document.createElement("style");
		style.id = TWIKOO_DARK_STYLE_ID;
		style.textContent = `
html.dark .twikoo {
	--tk-text: rgba(255, 255, 255, 0.75);
	--tk-text-strong: rgba(255, 255, 255, 0.9);
	--tk-border: rgba(255, 255, 255, 0.15);
}

html:not(.dark) .twikoo {
	--tk-text: rgba(0, 0, 0, 0.75);
	--tk-text-strong: rgba(0, 0, 0, 0.9);
	--tk-border: rgba(0, 0, 0, 0.12);
}

.twikoo,
.twikoo * {
	color: var(--tk-text);
}

.twikoo .tk-comments-title,
.twikoo .tk-nick,
.twikoo .tk-nick-link {
	color: var(--tk-text-strong) !important;
}

.twikoo .el-textarea__inner,
.twikoo .el-input__inner,
.twikoo textarea,
.twikoo input {
	background-color: var(--card-bg) !important;
	color: var(--tk-text) !important;
	border-color: var(--tk-border) !important;
}

.twikoo .tk-comment {
	border-color: var(--tk-border);
}

.twikoo .el-button--primary {
	background-color: var(--primary) !important;
	border-color: var(--primary) !important;
	color: #fff !important;
}

.twikoo a,
.twikoo .tk-action-icon,
.twikoo .tk-action-link {
	color: var(--primary) !important;
}

html.dark .twikoo .OwO .OwO-body {
	background-color: var(--card-bg) !important;
	color: var(--tk-text) !important;
	border-color: var(--tk-border) !important;
}

html:not(.dark) .twikoo .OwO .OwO-body {
	background-color: #ffffff !important;
	color: #4a4a4a !important;
	border-color: rgba(144, 147, 153, 0.31) !important;
}

.twikoo .OwO .OwO-body .OwO-packages li,
.twikoo .OwO .OwO-body .OwO-item,
.twikoo .OwO .OwO-body .OwO-item-title {
	color: inherit !important;
}
`.trim();
		document.head.appendChild(style);
	}

	onMount(() => {
		injectTwikooThemeStyle();

		if (!envId) return;

		const script = document.createElement("script");
		script.src = "//cdn.jsdelivr.net/npm/twikoo/dist/twikoo.all.min.js";
		script.onload = () => {
			// @ts-ignore
			twikoo.init({
				envId,
				el: "#tcomment",
				lang,
				path: window.location.pathname,
			});
		};
		document.head.appendChild(script);
	});
</script>

<div class="card-base px-6 md:px-9 pt-6 pb-4 mb-4 w-full overflow-hidden">
	<div class="flex items-center gap-2 mb-4">
		<div class="w-1 h-5 rounded-md bg-[var(--primary)]"></div>
		<h2 class="font-bold text-lg text-black/90 dark:text-white/90">
			{i18n(I18nKey.comments)}
		</h2>
	</div>

	{#if !envId}
		<div class="text-sm text-50 text-center py-8">
			评论功能未配置。请将 Twikoo 部署到 Vercel 后，在 <code class="bg-black/5 dark:bg-white/10 px-1 rounded">siteConfig.ts</code> 中填入 <code class="bg-black/5 dark:bg-white/10 px-1 rounded">envId</code>。
		</div>
	{:else}
		<div id="tcomment" class="min-h-[100px]"></div>
	{/if}
</div>

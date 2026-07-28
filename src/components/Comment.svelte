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

	onMount(() => {
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

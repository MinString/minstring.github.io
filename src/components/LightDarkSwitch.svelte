<script lang="ts">
import "../styles/theme-transition.css";
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { sunIcon, moonIcon, systemIcon } from "@constants/theme-icons";
import {
	applyThemeToDocument,
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount, tick } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

let { class: className = '' } = $props();

let mode: LIGHT_DARK_MODE = $state(AUTO_MODE);
let switching = false;

onMount(() => {
	mode = getStoredTheme();
	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = (_e) => {
		applyThemeToDocument(mode);
	};
	darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged);
	return () => {
		darkModePreference.removeEventListener(
			"change",
			changeThemeWhenSchemeChanged,
		);
	};
});

async function switchScheme(newMode: LIGHT_DARK_MODE) {
	if (switching || newMode === mode) return;
	const root = document.documentElement;
	const willBeDark = newMode === DARK_MODE ||
		(newMode === AUTO_MODE && window.matchMedia("(prefers-color-scheme: dark)").matches);
	const apply = async () => {
		mode = newMode;
		setTheme(newMode);
		await tick();
	};
	const button = document.getElementById("scheme-switch");
	if (!document.startViewTransition || !button ||
		window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
		root.classList.contains("dark") === willBeDark) {
		await apply();
		return;
	}

	const rect = button.getBoundingClientRect();
	const x = rect.left + rect.width / 2;
	const y = rect.top + rect.height / 2;
	const radius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y),
	);
	switching = true;
	root.classList.add("theme-reveal");
	try {
		const transition = document.startViewTransition(apply);
		try {
			await transition.ready;
			await root.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
				{ duration: 650, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
			).finished;
		} catch {
			// A skipped snapshot still applies the selected theme.
			transition.skipTransition();
		}
		await transition.finished;
	} finally {
		root.classList.remove("theme-reveal");
		switching = false;
	}
}

function toggleScheme() {
	const isDark = document.documentElement.classList.contains("dark");
	switchScheme(isDark ? LIGHT_MODE : DARK_MODE);
}

function showPanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.add("float-panel-closed");
}
</script>

<!-- z-50 make the panel higher than other float panels -->
<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button aria-label="Light/Dark Mode" role="menuitem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onclick={toggleScheme} onmouseenter={showPanel}>
        <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
            <Icon icon={sunIcon} class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
            <Icon icon={moonIcon} class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== AUTO_MODE}>
            <Icon icon={systemIcon} class="text-[1.25rem]"></Icon>
        </div>
    </button>

    <div id="light-dark-panel" class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5" >
        <div class="card-base float-panel p-2">
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === LIGHT_MODE}
                    onclick={() => switchScheme(LIGHT_MODE)}
            >
                <Icon icon={sunIcon} class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.lightMode)}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === DARK_MODE}
                    onclick={() => switchScheme(DARK_MODE)}
            >
                <Icon icon={moonIcon} class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.darkMode)}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
                    class:current-theme-btn={mode === AUTO_MODE}
                    onclick={() => switchScheme(AUTO_MODE)}
            >
                <Icon icon={systemIcon} class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.systemMode)}
            </button>
        </div>
    </div>
</div>

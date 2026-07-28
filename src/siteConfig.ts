import type { SiteConfig } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "MinString的博客",
	subtitle: "行到水穷处，坐看云起时",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: true, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true, // Display the banner image on the homepage
		src: "assets/images/111024784_p0.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "Welcome!", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// {
		// 	src: "/favicon/icon.png", // Path of the favicon, relative to the /public directory
		// 	theme: "light", // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		// 	sizes: "32x32", // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// },
	],
	comments: {
		enable: false,
		envId: "",
		lang: "zh-CN",
	},
};

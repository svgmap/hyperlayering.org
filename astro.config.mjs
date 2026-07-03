// @ts-check
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	// Temporary site + base config for github pages deployment
	site: "https://svgmap.github.io", // TODO: Change when migrated to real domain
	base: "hyperlayering.org",
	integrations: [svelte()],
	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
		},
	},
});

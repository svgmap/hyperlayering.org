// @ts-check
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	// Temporary site + base config for github pages deployment
	// TODO: Change when migrated to real domain
	site: "https://svgmap.github.io",
	base: "hyperlayering.org",
	integrations: [svelte()],

	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "en",
	},

	adapter: cloudflare(),
});

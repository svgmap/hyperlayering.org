import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import { satteri } from "@astrojs/markdown-satteri";
import { extractH1 } from "./satteri-plugins/extract-h1.mjs";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://hyperlayering.org/",
	integrations: [svelte()],
	markdown: {
		processor: satteri({
			mdastPlugins: [extractH1()],
			features: { directive: true },
		}),
	},

	i18n: {
		locales: ["en", "ja"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: false,
		},
	},

	adapter: cloudflare(),
});

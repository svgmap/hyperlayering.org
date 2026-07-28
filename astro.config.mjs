import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import { docusaurusHeadingIds } from "./satteri-plugins/docusaurusHeadingIds.mjs";
import { extractH1 } from "./satteri-plugins/extractH1.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://hyperlayering.org/",
	integrations: [svelte()],
	markdown: {
		processor: satteri({
			mdastPlugins: [extractH1()],
			hastPlugins: [docusaurusHeadingIds()],
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

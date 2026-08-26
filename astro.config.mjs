import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import { cleanMarkdownLinks } from "./satteri-plugins/cleanMarkdownLinks.mjs";
import { docusaurusHeadingIds } from "./satteri-plugins/docusaurusHeadingIds.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://hyperlayering.org/",

	markdown: {
		processor: satteri({
			hastPlugins: [docusaurusHeadingIds(), cleanMarkdownLinks()],
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

	integrations: [
		svelte(),
		sitemap(),
		expressiveCode({
			shiki: {
				langAlias: {
					svg: "xml",
				},
			},
		}),
		starlight({
			title: "Docs",
			disable404Route: true,
			logo: {
				src: "./src/assets/icons/logo.svg",
			},
			customCss: ["./src/styles/starlight.css"],
			sidebar: [
				{ slug: "tutorials" },
				{
					label: "Part 1: Basics",
					translations: {
						ja: "Part 1: 基本編",
					},
					collapsed: true,
					items: [
						"tutorials/1-basic",
						"tutorials/1-basic/tutorial-1",
						"tutorials/1-basic/tutorial-2a",
						"tutorials/1-basic/tutorial-2b",
						"tutorials/1-basic/tutorial-2c",
						"tutorials/1-basic/tutorial-3",
						"tutorials/1-basic/tutorial-3b",
						"tutorials/1-basic/tutorial-4",
					],
				},
				{
					label: "Part 2: WebApp Layer Edition",
					translations: {
						ja: "Part 2: WebApp Layer編",
					},
					collapsed: true,
					items: [
						"tutorials/2-webapp-layer-edition",
						"tutorials/2-webapp-layer-edition/tutorial-5",
						"tutorials/2-webapp-layer-edition/tutorial-6",
						"tutorials/2-webapp-layer-edition/tutorial-7",
						"tutorials/2-webapp-layer-edition/tutorial-8",
						"tutorials/2-webapp-layer-edition/tutorial-9",
						"tutorials/2-webapp-layer-edition/tutorial-9b",
						"tutorials/2-webapp-layer-edition/tutorial-10",
						"tutorials/2-webapp-layer-edition/tutorial-11",
					],
				},
				{
					label: "Part 3: Web Service Integration",
					translations: {
						ja: "Part 3: ウェブサービス結合編",
					},
					collapsed: true,
					items: [
						"tutorials/3-web-service-integration",
						"tutorials/3-web-service-integration/cross-origin-access",
						"tutorials/3-web-service-integration/tutorial-12",
						"tutorials/3-web-service-integration/tutorial-13",
						"tutorials/3-web-service-integration/tutorial-14",
						"tutorials/3-web-service-integration/tutorial-15",
					],
				},
				{
					label: "Part 4: Utilizing Existing WebApp Layers",
					translations: {
						ja: "Part 4: 既成WebApp Layer活用編",
					},
					collapsed: true,
					items: [
						"tutorials/4-utilizing-existing-webapp-layers",
						"tutorials/4-utilizing-existing-webapp-layers/using-svgmapapplayers-on-github-pages",
						"tutorials/4-utilizing-existing-webapp-layers/copy-svgmapapplayers",
					],
				},
			],
			defaultLocale: "root",
		}),
	],

	adapter: cloudflare({
		imageService: { build: "cloudflare-binding", runtime: "cloudflare-binding" },
		imagesBindingName: "IMAGES"
	}),
});

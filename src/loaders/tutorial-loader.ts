import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { isValidLang } from "@i18n/utils";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { glob } from "tinyglobby";

const tutorialLoader = (): Loader => {
	return {
		name: "tutorial-loader",
		load: async ({
			config,
			store,
			parseData,
			renderMarkdown,
			generateDigest,
		}) => {
			const base = new URL("./src/tutorials/", config.root);
			const files = await glob(["**/*.md", "!**/[Rr][Ee][Aa][Dd][Mm][Ee].md"], {
				cwd: fileURLToPath(base),
			});

			store.clear();

			for (const file of files) {
				const fileUrl = new URL(file, base);
				const raw = await readFile(fileUrl, "utf-8");

				const rendered = await renderMarkdown(raw, { fileURL: fileUrl });
				if (!rendered.metadata?.frontmatter) continue;

				const id = file.replace(/(index\.md|\.md)$/, "");
				// Removing empty "segment" strings + removing segments that match valid langs/locale 
				const segments = id.split("/").filter(Boolean).filter((i) => !isValidLang(i));
				const group = segments.slice(0, -1);
				const data = await parseData({
					id,
					data: { ...rendered.metadata.frontmatter, group },
				});

				store.set({
					id,
					data,
					rendered,
					digest: generateDigest(raw),
				});
			}
		},
		schema: z.object({
			title: z.string(),
			group: z.array(z.string()).default([]),
			sidebar_position: z.number().optional(),
		}),
	};
};

export default tutorialLoader;

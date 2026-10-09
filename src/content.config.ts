// Defining schemas for content
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const urlOrPath = z.string().refine((value) => {
	// Local path: single leading slash, no whitespace
	if (/^\/(?!\/)\S*$/.test(value)) return true;

	try {
		const { protocol } = new URL(value);
		return protocol === 'http:' || protocol === 'https:';
	} catch {
		return false;
	}
}, { message: 'Must be an http(s) URL or a local path starting with "/"' });

const update = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/updates" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		showToc: z.boolean().optional().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

const guideline = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guidelines" }),
	schema: z.object({
		title: z.string(),
		lastUpdated: z.coerce.date(),
		version: z.string(),
		showToc: z.boolean().optional().default(true),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
	schema: z.object({
		name: z.string(),
		photo: z.string().optional(),
		bio: z.string().optional(),
	}),
});

const home = defineCollection({
	loader: glob({ pattern: "**/home.json", base: "./src/content/pages" }),
	schema: z.object({
		hero: z.object({
			heading: z.string(),
			subheading: z.string(),
		}),
		aboutHyperLayering: z.array(
			z.object({
				sectionTitle: z.string(),
				sectionBody: z.string(),
			}),
		),
		aboutCloser: z.string(),
	}),
});

const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema(),
});

const footer = defineCollection({
	loader: glob({ pattern: "**/footer.json", base: "./src/content/navigation" }),
	schema: z.object({
		navGroup: z.array(
			z.object({
				groupTitle: z.string(),
				navLinks: z.array(z.object({
					linkLabel: z.string(),
					isExternal: z.boolean().optional(),
					link: urlOrPath,
				})),
			})
		)
	}),
})

export const collections = { update, guideline, docs, authors, home, footer };

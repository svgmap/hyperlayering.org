// Defining schemas for content
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const update = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/updates" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		date: z.coerce.date(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const guideline = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guidelines" }),
	schema: z.object({
		title: z.string(),
		lastUpdated: z.coerce.date(),
		version: z.string(),
	}),
});

const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema(),
});

export const collections = { update, guideline, docs };

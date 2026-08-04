// Defining schemas for content
import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import tutorialLoader from "./loaders/tutorial-loader";

const update = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/updates" }),
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const tutorial = defineCollection({
	loader: tutorialLoader(),
	schema: z.object({
		title: z.string(),
		group: z.array(z.string()).default([]),
		sidebar_position: z.number().optional(),
	}),
});

// Stub collection just to satisfy Starlight's integration requirements.
// Not used for real content — real pages use StarlightPage directly.
const docs = defineCollection({
	loader: docsLoader(),
	schema: docsSchema(),
});

export const collections = { update, tutorial, docs };

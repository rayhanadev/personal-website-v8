import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
	loader: glob({
		pattern: import.meta.env.DEV ? "**/*.{md,mdx}" : "**/[^_]*.{md,mdx}",
		base: "./src/content/blog",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
	}),
});

const work = defineCollection({
	loader: glob({
		pattern: import.meta.env.DEV ? "**/*.{md,mdx}" : "**/[^_]*.{md,mdx}",
		base: "./src/content/work",
	}),
	schema: z.object({
		index: z.number().int(),
		company: z.string(),
		title: z.string(),
		team: z.nullable(z.string()),
		vertical: z.nullable(z.string()),
		employment: z.union([
			z.literal("full-time"),
			z.literal("part-time"),
			z.literal("self-employed"),
			z.literal("freelance"),
			z.literal("contract"),
			z.literal("internship"),
			z.literal("volunteer"),
		]),
		start: z.string(),
		end: z.nullable(z.string()),
		current: z.boolean(),
		location: z.string(),
		locationType: z.union([
			z.literal("on-site"),
			z.literal("hybrid"),
			z.literal("remote"),
		]),
		description: z.string(),
		skills: z.array(z.string()),
	}),
});

export const collections = { blog, work };

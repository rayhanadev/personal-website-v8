import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import gabAstroCompress from "gab-astro-compress";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import { visualizer } from "rollup-plugin-visualizer";
import glsl from "vite-plugin-glsl";
import { schema } from "./env.ts";

const DEV = process.env.NODE_ENV !== "production";
const SITE =
	process.env.NODE_ENV === "production"
		? "https://www.rayhanadev.com"
		: process.env.NODE_ENV === "staging"
			? "https://staging.rayhanadev.com"
			: "http://localhost:3000";

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	site: SITE,
	redirects: {
		"/resume": "/work",
		"/b/[id]": "/blog/[id]",
	},
	output: "static",
	adapter: cloudflare({
		imageService: "compile",
		platformProxy: {
			enabled: true,
		},
	}),
	integrations: [
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap({
			filter: (page) => {
				return !page.includes("/blog/_");
			},
		}),
		react(),
		mdx(),
		gabAstroCompress(),
	],
	vite: {
		build: {
			sourcemap: true,
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes("node_modules/three/")) {
							return "three";
						}
					},
				},
			},
		},
		plugins: [
			// @ts-expect-error: mismatch between astro and vite types
			glsl(),
			// @ts-expect-error: mismatch between astro and vite types
			tailwindcss(),
			DEV &&
				visualizer({
					emitFile: true,
					filename: "stats.html",
				}),
		],
		ssr: {
			external: [
				"node:fs/promises",
				"node:path",
				"node:crypto",
				"canvas",
				"gl",
			],
		},
	},
	markdown: {
		shikiConfig: {
			theme: "one-light",
		},
		rehypePlugins: [
			rehypeSlug,
			rehypeAutolinkHeadings,
			rehypeCodeTitles,
			rehypeKatex,
		],
		remarkPlugins: [remarkMath],
	},
	server: {
		port: 3000,
	},
	env: {
		schema,
		validateSecrets: true,
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "load",
	},
	// image: {
	//   responsiveStyles: true,
	// },
	experimental: {
		clientPrerender: true,
		contentIntellisense: true,
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Instrument Serif",
				cssVariable: "--font-instrument-serif",
			},
			{
				provider: fontProviders.fontshare(),
				name: "General Sans",
				cssVariable: "--font-general-sans",
			},
			{
				provider: fontProviders.google(),
				name: "Geist Mono",
				cssVariable: "--font-geist-mono",
			},
		],
	},
});

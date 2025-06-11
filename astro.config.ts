import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";

import glsl from "vite-plugin-glsl";
import { visualizer } from "rollup-plugin-visualizer";

import { schema } from "./env.ts";

import mdx from "@astrojs/mdx";

const DEV = process.env.NODE_ENV! !== "production";
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
        playformCompress({
            Logger: 1,
        }),
    ],
    vite: {
        build: {
            sourcemap: true,
        },
        plugins: [
            glsl(),
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
    experimental: {
        responsiveImages: true,
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

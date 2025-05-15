import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";

import { schema } from "./env.ts";

const { SITE } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

export default defineConfig({
  site: SITE ?? "http://localhost:3000",
  redirects: {
    "/work": "/resume",
    "/b/[id]": "/blog/[id]",
  },
  output: "static",
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
    playformCompress({
      Logger: 1,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
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
    defaultStrategy: "viewport",
  },
});

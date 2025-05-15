import { envField as e } from "astro/config";

export const schema = {
  SITE: e.string({
    context: "server",
    access: "public",
    optional: true,
  }),
  PUBLIC_UMAMI_WEBSITE_ID: e.string({
    context: "client",
    access: "public",
    optional: true,
  }),
};

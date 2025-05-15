import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: *
Allow: /

User-agent: *
Disallow: /cdn-cgi/

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

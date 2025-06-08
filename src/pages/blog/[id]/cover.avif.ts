import crypto from "node:crypto";

import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import { renderPattern } from "lib/shaders";

export const GET: APIRoute = async (ctx) => {
    const { id } = ctx.params;

    if (!id) {
        return new Response(`Not found.`, {
            status: 404,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    }

    const hash = crypto.createHash("sha1").update(id).digest("hex");
    const png = renderPattern(hash, 1588, 497);
    const avif = await sharp(png)
        .toFormat("heif", { compression: "av1" })
        .toBuffer();

    return new Response(avif, {
        headers: { "Content-Type": "image/avif" },
    });
};

export async function getStaticPaths() {
    const blogEntries = await getCollection("blog");

    return blogEntries
        .filter((entry) => {
            if (import.meta.env.DEV) return true;
            return !entry.id.startsWith("_");
        })
        .map((entry) => {
            return {
                params: { id: entry.id },
            };
        });
}

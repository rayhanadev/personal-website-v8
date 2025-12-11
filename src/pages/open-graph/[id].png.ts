import { getCollection } from "astro:content";
import crypto from "node:crypto";
import type { APIRoute } from "astro";
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
	const png = renderPattern(hash, 1200, 630);
	return new Response(new Uint8Array(png), {
		headers: { "Content-Type": "image/png" },
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

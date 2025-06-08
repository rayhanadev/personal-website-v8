import type { APIRoute } from "astro";
import { actions } from "astro:actions";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
    const { data, error } = await ctx.callAction(actions.spotify.get, {});

    if (error) {
        return new Response(`Internal error.`, {
            status: 500,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
            },
        });
    }

    const message = data
        ? `I'm currently listening to "${data.song}" by ${data.artist}`
        : "I'm not listening to anything right now";

    return new Response(message, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};

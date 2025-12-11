import { actions } from "astro:actions";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async (ctx) => {
	const { data, error } = await ctx.callAction(actions.location.get, {});

	if (error) {
		return new Response(`Internal error.`, {
			status: 500,
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}

	const { location, weather } = data;
	const { city, state } = location;
	const { temperature } = weather;

	return new Response(
		`I'm at ${city}, ${state} where it's ${Math.round(temperature)}° F`,
		{
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	);
};

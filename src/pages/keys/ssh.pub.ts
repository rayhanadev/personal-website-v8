import type { APIRoute } from "astro";

import { SSH_PUBLIC_KEY } from "lib/consts";

export const GET: APIRoute = () => {
	return new Response(SSH_PUBLIC_KEY, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};

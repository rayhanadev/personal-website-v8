import type { APIRoute } from "astro";

import { GPG_PUBLIC_KEY } from "lib/consts";

export const GET: APIRoute = () => {
  return new Response(GPG_PUBLIC_KEY, {
    headers: {
      "Content-Type": "application/pgp-keys; charset=utf-8",
    },
  });
};

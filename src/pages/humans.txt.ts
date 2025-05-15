import type { APIRoute } from "astro";
import dayjs from "dayjs";

const robotsTxt = `
/* TEAM */
	Owner: Rayhan Noufal Arayilakath
	Contact: me@rayhanadev.com
	Twitter: @rayhanadev
	From: Dallas, Texas, United States of America

/* SITE */
	Last update: ${dayjs().format("YYYY/MM/DD")}
	Language: English
	Doctype: HTML5
	IDE: Zed
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

import { parseDateFromFilePath } from "lib/blog";
import { EMAIL_ADDRESS, FULL_NAME } from "lib/consts";

const BLOG_CUSTOM_DATA = `
<atom:link href="${import.meta.env.SITE}/rss.xml" rel="self" type="application/rss+xml" />
<category>Technology</category>
<copyright>Copyright ${new Date().getUTCFullYear()} Rayhan Noufal Arayilakath</copyright>
<docs>https://www.rssboard.org/rss-specification</docs>
<generator>@astrojs/rss</generator>
<image>
  <link>https://www.rayhanadev.com/</link>
  <title>Ray's Blog 🪴</title>
  <url>https://www.rayhanadev.com/favicon-96x96.png</url>
  <description>Various essays written by Ray, related to software engineering and life.</description>
  <height>96</height>
  <width>96</width>
</image>
<language>en-US</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<managingEditor>${EMAIL_ADDRESS} (${FULL_NAME})</managingEditor>
<pubDate>${new Date().toUTCString()}</pubDate>
<ttl>60</ttl>
<webMaster>${EMAIL_ADDRESS} (${FULL_NAME})</webMaster>
`;

export const GET: APIRoute = async () => {
	const blog = await getCollection("blog");
	return rss({
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
		},
		title: "Ray's Blog 🪴",
		description:
			"Various essays written by Ray, related to software engineering and life.",
		site: import.meta.env.SITE,
		customData: BLOG_CUSTOM_DATA,
		items: await Promise.all(
			blog.map(async (post): Promise<RSSFeedItem> => {
				if (!post.filePath) {
					throw new Error(`Post ${post.id} has no filePath`);
				}

				const date = parseDateFromFilePath(post.filePath);

				const ogImagePath = path.resolve(
					process.cwd(),
					`./dist/open-graph/${post.id}.png`,
				);
				const ogImageFile = await fs
					.readFile(ogImagePath)
					.catch(() => undefined);

				return {
					author: `${EMAIL_ADDRESS} (${FULL_NAME})`,
					categories: post.data.tags,
					description: post.data.description,
					enclosure: ogImageFile && {
						length: ogImageFile.byteLength,
						type: "image/png",
						url: `${import.meta.env.SITE}/open-graph/${post.id}.png`,
					},
					link: `${import.meta.env.SITE}/blog/${post.id}/`,
					pubDate: date,
					title: post.data.title,
					content:
						post.body &&
						sanitizeHtml(parser.render(post.body), {
							allowedTags: sanitizeHtml.defaults.allowedTags.concat([
								"img",
								"figure",
								"figcaption",
							]),
						}),
					customData: `<guid>${import.meta.env.SITE}/blog/${post.id}/</guid>`,
				};
			}),
		).then((items) =>
			items.sort(
				(a, b) =>
					// biome-ignore lint/style/noNonNullAssertion: astro makes pubDate optional
					new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime(),
			),
		),
	});
};

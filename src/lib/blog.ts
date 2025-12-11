import { BLOG_CONTENT_POOL_PATH } from "./consts";

const relativePath = BLOG_CONTENT_POOL_PATH.replace(process.cwd(), "").slice(1);

export function isDraft(slug: string) {
	const file = slug.replace(relativePath, "").slice(1);

	return file.startsWith("_");
}

export function parseDateFromFilePath(slug: string) {
	const file = slug.replace(relativePath, "").slice(1);

	const [y, m, d] = file.split("-") as [string, string, string];

	return new Date(Number(y.replace("_", "")), Number(m) - 1, Number(d));
}

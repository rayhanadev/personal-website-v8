import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";
import { sqliteTable as table } from "drizzle-orm/sqlite-core";

export const views = table("views", {
	id: t.text("id").primaryKey(),
	count: t.integer("count").default(0),
});

export type View = InferSelectModel<typeof views>;
export type ViewInsert = InferInsertModel<typeof views>;

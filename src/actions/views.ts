import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { eq } from "drizzle-orm";

import connect from "lib/db";
import * as m from "lib/db/models";

export const views = {
    get: defineAction({
        input: z.object({
            id: z.string(),
        }),
        handler: async (input, ctx) => {
            const { env } = ctx.locals.runtime;

            const db = connect(env.DB);

            const response = await db.query.views.findFirst({
                where: eq(m.views.id, input.id),
                columns: { count: true },
            });

            if (!response) return 1;

            const { count } = response;
            return count ?? 0;
        },
    }),
    update: defineAction({
        input: z.object({
            id: z.string(),
        }),
        handler: async (input, ctx) => {
            const { env } = ctx.locals.runtime;

            const db = connect(env.DB);

            const response = await db.query.views.findFirst({
                where: eq(m.views.id, input.id),
                columns: { count: true },
            });

            if (typeof response?.count === "number") {
                await db
                    .update(m.views)
                    .set({
                        count: response.count + 1,
                    })
                    .where(eq(m.views.id, input.id));
            } else {
                await db.insert(m.views).values({
                    id: input.id,
                    count: 1,
                });
            }

            const count = response?.count ? response.count + 1 : 1;

            return count;
        },
    }),
};

import { drizzle } from "drizzle-orm/d1";

import * as schema from "./models";

export default function connect(d1: D1Database) {
    const db = drizzle(d1, { schema });
    return db;
}

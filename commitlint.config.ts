import type { UserConfig } from "@commitlint/types";

export default {
    extends: ["@commitlint/config-conventional"],
    formatter: "@commitlint/format",
} satisfies UserConfig;

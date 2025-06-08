PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_views` (
	`path` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0
);
--> statement-breakpoint
INSERT INTO `__new_views`("path", "count") SELECT "path", "count" FROM `views`;--> statement-breakpoint
DROP TABLE `views`;--> statement-breakpoint
ALTER TABLE `__new_views` RENAME TO `views`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
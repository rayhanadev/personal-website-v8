CREATE TABLE `views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`path` text NOT NULL,
	`count` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `path_idx` ON `views` (`id`);
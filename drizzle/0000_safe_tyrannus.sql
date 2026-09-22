CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`screen_id` text NOT NULL,
	`author` text NOT NULL,
	`text` text NOT NULL,
	`resolved` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `flows` (
	`id` text PRIMARY KEY NOT NULL,
	`screens` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `presence` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`screen_id` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `presence_updated_at_idx` ON `presence` (`updated_at`);
CREATE TABLE IF NOT EXISTS "consumed_message_to_l1" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"payload" text,
	"end_cursor" text,
	"unique_key" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consumed_message_to_l2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"selector" text,
	"payload" text,
	"nonce" text,
	"end_cursor" text,
	"unique_key" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "log_message_to_l1" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"payload" text,
	"end_cursor" text,
	"unique_key" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message_to_l2_canceled" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"selector" text,
	"payload" text,
	"nonce" text,
	"end_cursor" text,
	"unique_key" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message_to_l2_cancellation_started" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"selector" text,
	"payload" text,
	"nonce" text,
	"end_cursor" text,
	"unique_key" text
);

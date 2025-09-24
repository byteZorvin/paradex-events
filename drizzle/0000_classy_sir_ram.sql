CREATE TABLE IF NOT EXISTS "log_message_to_l2" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"from_address" text,
	"to_address" text,
	"selector" text,
	"payload" text,
	"nonce" text,
	"fee" text,
	"end_cursor" text,
	"unique_key" text
);

ALTER TABLE "consumed_message_to_l1" ADD COLUMN "timestamp" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "consumed_message_to_l2" ADD COLUMN "timestamp" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "log_message_to_l1" ADD COLUMN "timestamp" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "log_message_to_l2" ADD COLUMN "timestamp" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "message_to_l2_canceled" ADD COLUMN "timestamp" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "message_to_l2_cancellation_started" ADD COLUMN "timestamp" timestamp DEFAULT now();
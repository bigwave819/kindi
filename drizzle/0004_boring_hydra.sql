CREATE TABLE "orders" (
	"id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL,
	"total" integer GENERATED ALWAYS AS (quantity * price) STORED,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "district" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "sector" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "cell" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "village" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_menu_id_fk" FOREIGN KEY ("id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
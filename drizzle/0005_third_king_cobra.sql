ALTER TABLE "orders" DROP CONSTRAINT "orders_id_menu_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "menu_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_date" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "district" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "sector" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "village" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_menu_id_menu_id_fk" FOREIGN KEY ("menu_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
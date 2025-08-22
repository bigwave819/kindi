ALTER TABLE "assets" RENAME TO "menu";--> statement-breakpoint
ALTER TABLE "menu" DROP CONSTRAINT "assets_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "menu" ADD CONSTRAINT "menu_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
CREATE TABLE "staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" integer NOT NULL,
	"post" text NOT NULL,
	"gender" text NOT NULL,
	"salary" integer NOT NULL,
	"fileUrl" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);

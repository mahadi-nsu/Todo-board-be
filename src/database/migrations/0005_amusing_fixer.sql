ALTER TABLE "tickets" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "order" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_order_unique" UNIQUE("order");
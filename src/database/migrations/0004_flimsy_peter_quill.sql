ALTER TABLE "tickets_to_labels" DROP CONSTRAINT "tickets_to_labels_ticket_id_tickets_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets_to_labels" DROP CONSTRAINT "tickets_to_labels_label_id_labels_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets_to_labels" ADD CONSTRAINT "tickets_to_labels_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets_to_labels" ADD CONSTRAINT "tickets_to_labels_label_id_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "public"."labels"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "labels" ADD CONSTRAINT "labels_title_unique" UNIQUE("title");
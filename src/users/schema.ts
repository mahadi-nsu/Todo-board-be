import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { createZodDto } from "nestjs-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type UserWithoutPassword = Omit<User, "password">;

export const SelectUsersDto = createZodDto(createSelectSchema(users).omit({ password: true }));

const createUsersSchema = createInsertSchema(
  users,
  {
    name: schema => schema.min(1).max(100).describe("The name of the user"),
    email: schema => schema.min(1).max(500).describe("The email of the user"),
    password: schema =>
      schema
        .min(6, "Password must be at least 6 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])/, // at least one lowercase, one uppercase, one special
          "Password must contain at least one lowercase letter, one uppercase letter, and one special character",
        )
        .describe("The password of the user"),
  },
).required({
  name: true,
  email: true,
  password: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateUsersDto extends createZodDto(createUsersSchema) {}

import { bigint, boolean, integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm/relations"

export const users = pgTable("users", {
   id: uuid("id").defaultRandom().primaryKey(),
   email: text("email").notNull().unique(),
   fullName: text("full_name").notNull(),
   registeredVia: text("registered_via").notNull(),
   clerkId: text("clerk_id").notNull().unique(),
   createdAt: bigint("created_at", { mode: "number" }).notNull(),
})

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"])
export const groceryItems = pgTable("grocery_items", {
   id: uuid("id").defaultRandom().primaryKey(),
   name: text("name").notNull(),
   category: text("category").notNull(),
   quantity: integer("quantity").notNull().default(1),
   purchased: boolean("purchased").notNull().default(false),
   priority: priorityEnum("priority").notNull().default("medium"),
   updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
   userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
})

export const usersRelations = relations(users, ({ many }) => ({
   groceryItems: many(groceryItems),
}))

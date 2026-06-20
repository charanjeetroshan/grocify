import { bigint, boolean, integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core"

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"])

export const groceryItems = pgTable("grocery_items", {
   id: text("id").primaryKey(),
   name: text("name").notNull(),
   category: text("category").notNull(),
   quantity: integer("quantity").notNull().default(1),
   purchased: boolean("purchased").notNull().default(false),
   priority: priorityEnum("priority").notNull().default("medium"),
   updatedAt: bigint("updated_at", { mode: "number" }).notNull(),
})

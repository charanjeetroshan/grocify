import { groceryItems } from "@/lib/db/schema"

export type GroceryItem = typeof groceryItems.$inferSelect

export type GroceryCategory =
   | "Produce"
   | "Dairy"
   | "Meat"
   | "Bakery"
   | "Frozen Foods"
   | "Beverages"
   | "Snacks"
   | "Household Items"
   | "Personal Care"

export type GroceryPriority = GroceryItem["priority"]

export type CreateGroceryItemInput = Omit<GroceryItem, "id" | "purchased" | "updatedAt">

export type CreateGroceryItemApiRequest = Omit<GroceryItem, "id" | "purchased" | "updatedAt" | "userId">

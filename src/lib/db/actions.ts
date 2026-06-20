import type { CreateGroceryItemInput } from "@/types"
import { desc, eq } from "drizzle-orm"
import { db } from "./client"
import { groceryItems } from "./schema"

export const listGroceryItems = async () => {
   return await db.select().from(groceryItems).orderBy(desc(groceryItems.updatedAt))
}

export const createGroceryItem = async (item: CreateGroceryItemInput) => {
   const rows = await db
      .insert(groceryItems)
      .values({
         id: crypto.randomUUID(),
         purchased: false,
         updatedAt: Date.now(),
         ...item,
         quantity: Math.max(item.quantity, 1),
      })
      .returning()

   return rows[0]
}

export const setGroceryItemPurchased = async (id: string, purchased: boolean) => {
   const rows = await db
      .update(groceryItems)
      .set({ purchased, updatedAt: Date.now() })
      .where(eq(groceryItems.id, id))
      .returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

export const updateGroceryItemQuantity = async (id: string, quantity: number) => {
   const rows = await db
      .update(groceryItems)
      .set({ quantity: Math.max(Math.floor(quantity), 1), updatedAt: Date.now() })
      .where(eq(groceryItems.id, id))
      .returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

export const deleteGroceryItem = async (id: string) => {
   const rows = await db.delete(groceryItems).where(eq(groceryItems.id, id)).returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

export const clearCompletedGroceryItems = async () => {
   const rows = await db.delete(groceryItems).where(eq(groceryItems.purchased, true)).returning()
   return rows.length
}

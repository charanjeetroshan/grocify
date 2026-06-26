import type { CreateGroceryItemInput } from "@/types"
import { and, desc, eq } from "drizzle-orm"
import { db } from "./client"
import { groceryItems } from "./schema"

const listGroceryItems = async (userId: string) => {
   return await db
      .select()
      .from(groceryItems)
      .where(eq(groceryItems.userId, userId))
      .orderBy(desc(groceryItems.updatedAt))
}

const createGroceryItem = async (item: CreateGroceryItemInput) => {
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

const setGroceryItemPurchased = async (id: string, purchased: boolean, userId: string) => {
   const rows = await db
      .update(groceryItems)
      .set({ purchased, updatedAt: Date.now() })
      .where(and(eq(groceryItems.id, id), eq(groceryItems.userId, userId)))
      .returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

const updateGroceryItemQuantity = async (id: string, quantity: number, userId: string) => {
   const rows = await db
      .update(groceryItems)
      .set({ quantity: Math.max(Math.floor(quantity), 1), updatedAt: Date.now() })
      .where(and(eq(groceryItems.id, id), eq(groceryItems.userId, userId)))
      .returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

const deleteGroceryItem = async (id: string, userId: string) => {
   const rows = await db
      .delete(groceryItems)
      .where(and(eq(groceryItems.id, id), eq(groceryItems.userId, userId)))
      .returning()

   if (rows.length === 0) {
      return null
   }

   return rows[0]
}

const clearPurchasedGroceryItems = async (userId: string) => {
   const rows = await db
      .delete(groceryItems)
      .where(and(eq(groceryItems.userId, userId), eq(groceryItems.purchased, true)))
      .returning()
   return rows.length
}

export const groceryDbActions = {
   listGroceryItems,
   createGroceryItem,
   setGroceryItemPurchased,
   updateGroceryItemQuantity,
   deleteGroceryItem,
   clearPurchasedGroceryItems,
}

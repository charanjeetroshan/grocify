import { GroceryItem } from "./grocery"

export type GroceryItemsResponse = {
   items: GroceryItem[]
   message: string
}

export type GroceryItemResponse = {
   item: GroceryItem
   message: string
}

export type ClearGroceryItemsResponse = {
   message: string
   rowsAffected: number
}

export type ApiErrorResponse = {
   error: string
}

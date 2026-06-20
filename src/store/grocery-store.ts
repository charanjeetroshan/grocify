import type { CreateGroceryItemInput, GroceryItem } from "@/types"
import { create } from "zustand"

type GroceryStore = {
   items: GroceryItem[]
   isLoading: boolean
   error: string | null
   loadItems: () => Promise<void>
   addItem: (item: CreateGroceryItemInput) => Promise<void>
   updateQuantity: (id: string, quantity: number) => Promise<void>
   togglePurchased: (id: string) => Promise<void>
   removeItem: (id: string) => Promise<void>
   clearPurchased: () => Promise<void>
}

export const useGroceryStore = create<GroceryStore>((set, get) => ({
   items: [],
   isLoading: false,
   error: null,
   loadItems: async () => {
      set({ isLoading: true, error: null })

      try {
         const response = await fetch("/api/items")
         const result = await response.json()

         if (!response.ok) {
            throw new Error(`Failed to load grocery items: ${result.error}`)
         }

         set({ items: result.items })
      } catch (error) {
         console.log("Error loading items", error)
         set({ error: "Error loading items" })
      } finally {
         set({ isLoading: false })
      }
   },
   addItem: async (item) => {
      set({ isLoading: true, error: null })

      try {
         const response = await fetch("/api/items", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               ...item,
               quantity: Math.max(item.quantity, 1),
            }),
         })
         const result = await response.json()

         if (!response.ok) {
            throw new Error(`Failed to create grocery item: ${result.error}`)
         }

         set((state) => ({ items: [result.item, ...state.items] }))
      } catch (error) {
         console.log("Error adding item", error)
         set({ error: "Error adding item" })
      } finally {
         set({ isLoading: false })
      }
   },
   updateQuantity: async (id, quantity) => {
      const originalQuantity = get().items.find((item) => item.id === id)?.quantity

      if (originalQuantity === undefined) {
         set({ error: "Item to update not found" })
         return
      }

      const latestQuantity = Math.max(quantity, 1)
      set((state) => ({
         isLoading: true,
         error: null,
         items: state.items.map((item) => (item.id === id ? { ...item, quantity: latestQuantity } : item)),
      }))

      try {
         const response = await fetch(`/api/items/${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: latestQuantity }),
         })

         const result = await response.json()

         if (!response.ok) {
            set((state) => ({
               items: state.items.map((item) => (item.id === id ? { ...item, quantity: originalQuantity } : item)),
            }))
            throw new Error(`Failed to update grocery item's quantity: ${result.error}`)
         }
      } catch (error) {
         set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, quantity: originalQuantity } : item)),
         }))
         console.log("Error updating quantity", error)
         set({ error: "Error updating quantity" })
      } finally {
         set({ isLoading: false })
      }
   },
   togglePurchased: async (id) => {
      const item = get().items.find((item) => item.id === id)

      if (!item) {
         set({ error: "Item to delete not found" })
         return
      }

      set((state) => ({
         isLoading: true,
         error: null,
         items: state.items.map((item) => (item.id === id ? { ...item, purchased: !item.purchased } : item)),
      }))

      try {
         const response = await fetch(`/api/items/${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ purchased: !item.purchased }),
         })

         const result = await response.json()

         if (!response.ok) {
            set((state) => ({
               items: state.items.map((item) => (item.id === id ? { ...item, purchased: item.purchased } : item)),
            }))
            throw new Error(`Failed to toggle grocery item's purchased status: ${result.error}`)
         }
      } catch (error) {
         set((state) => ({
            items: state.items.map((item) => (item.id === id ? { ...item, purchased: item.purchased } : item)),
         }))
         console.log("Error toggling purchased", error)
         set({ error: "Error toggling purchased" })
      } finally {
         set({ isLoading: false })
      }
   },
   removeItem: async (id) => {
      const itemToDelete = get().items.find((item) => item.id === id)

      if (!itemToDelete) {
         set({ error: "Item to delete not found" })
         return
      }

      const itemToDeleteIndex = get().items.findIndex((item) => item.id === id)

      set((state) => ({
         isLoading: true,
         error: null,
         items: state.items.filter((item) => item.id !== id),
      }))

      try {
         const response = await fetch(`/api/items/${id}`, { method: "DELETE" })
         const result = await response.json()

         if (!response.ok) {
            set((state) => ({
               items: state.items
                  .slice(0, itemToDeleteIndex)
                  .concat(itemToDelete, state.items.slice(itemToDeleteIndex)),
            }))
            throw new Error(`Failed to delete grocery item: ${result.error}`)
         }
      } catch (error) {
         set((state) => ({
            items: state.items.slice(0, itemToDeleteIndex).concat(itemToDelete, state.items.slice(itemToDeleteIndex)),
         }))
         console.log("Error deleting item", error)
         set({ error: "Error deleting item" })
      } finally {
         set({ isLoading: false })
      }
   },
   clearPurchased: async () => {
      set({ isLoading: true, error: null })

      try {
         const response = await fetch("/api/items/clear-purchased", { method: "DELETE" })
         const result = await response.json()

         if (!response.ok) {
            throw new Error(`Failed to clear purchased grocery items: ${result.error}`)
         }

         set((state) => ({ items: state.items.filter((item) => !item.purchased) }))
      } catch (error) {
         console.log("Error clearing purchased items", error)
         set({ error: "Error clearing purchased items" })
      } finally {
         set({ isLoading: false })
      }
   },
}))

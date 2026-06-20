import { deleteGroceryItem, setGroceryItemPurchased, updateGroceryItemQuantity } from "@/lib/db/actions"

export async function DELETE(_: Request, { id }: { id: string }) {
   try {
      const rows = await deleteGroceryItem(id)

      if (!rows) {
         return Response.json({ error: "Grocery item not found" }, { status: 404 })
      }

      return Response.json(
         {
            message: "Grocery item deleted successfully",
            rowsAffected: rows,
         },
         { status: 200 },
      )
   } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete grocery item"
      return Response.json({ error: message }, { status: 500 })
   }
}

export async function PATCH(request: Request, { id }: { id: string }) {
   try {
      const { quantity, purchased } = await request.json()

      const item = quantity
         ? await updateGroceryItemQuantity(id, quantity)
         : await setGroceryItemPurchased(id, purchased ?? true)

      if (!item) {
         return Response.json({ error: "Grocery item not found" }, { status: 404 })
      }

      return Response.json(
         {
            message: "Grocery item updated successfully",
            item,
         },
         { status: 200 },
      )
   } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update grocery item"
      return Response.json({ error: message }, { status: 500 })
   }
}

import { authHandler, isUser } from "@/lib"
import { groceryDbActions } from "@/lib/db/"

export async function DELETE(request: Request, { id }: { id: string }) {
   try {
      const user = await authHandler.ensureUserAuthenticated(request)

      if (!isUser(user)) {
         return user.result
      }

      const row = await groceryDbActions.deleteGroceryItem(id, user.id)

      if (!row) {
         return Response.json({ error: "Grocery item not found" }, { status: 404 })
      }

      return Response.json(
         {
            message: "Grocery item deleted successfully",
            item: row,
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
      const user = await authHandler.ensureUserAuthenticated(request)

      if (!isUser(user)) {
         return user.result
      }

      const item = quantity
         ? await groceryDbActions.updateGroceryItemQuantity(id, quantity, user.id)
         : await groceryDbActions.setGroceryItemPurchased(id, purchased ?? true, user.id)

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

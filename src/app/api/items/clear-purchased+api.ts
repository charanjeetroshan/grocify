import { authHandler, isUser } from "@/lib"
import { groceryDbActions } from "@/lib/db/"

export async function DELETE(request: Request) {
   try {
      const user = await authHandler.ensureUserAuthenticated(request)

      if (!isUser(user)) {
         return user.result
      }

      const rows = await groceryDbActions.clearPurchasedGroceryItems(user.id)
      return Response.json(
         {
            message: "Purchased grocery items cleared successfully",
            rowsAffected: rows,
         },
         { status: 200 },
      )
   } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to clear purchased grocery items"
      return Response.json({ error: message }, { status: 500 })
   }
}

import { clearCompletedGroceryItems as clearPurchasedGroceryItems } from "@/lib/db/actions"

export async function POST() {
   try {
      const rows = await clearPurchasedGroceryItems()
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

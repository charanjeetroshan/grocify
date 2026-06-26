import { authHandler, isUser } from "@/lib"
import { groceryDbActions } from "@/lib/db/"

export async function GET(request: Request) {
   try {
      const user = await authHandler.ensureUserAuthenticated(request)

      if (!isUser(user)) {
         return user.result
      }

      return Response.json({ items: await groceryDbActions.listGroceryItems(user.id) }, { status: 200 })
   } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch grocery items"
      return Response.json({ error: message }, { status: 500 })
   }
}

export async function POST(request: Request) {
   try {
      const { name, category, quantity, priority } = await request.json()

      if (!name || !category || !priority) {
         return Response.json({ error: "Missing required fields" }, { status: 400 })
      }

      const user = await authHandler.ensureUserAuthenticated(request)

      if (!isUser(user)) {
         return user.result
      }

      const item = await groceryDbActions.createGroceryItem({ userId: user.id, name, category, quantity, priority })

      return Response.json(
         {
            item,
            message: "Grocery item created successfully",
         },
         { status: 201 },
      )
   } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create new grocery item"
      return Response.json({ error: message }, { status: 500 })
   }
}

import { createGroceryItem, listGroceryItems } from "@/lib/db/actions"

export async function GET() {
   try {
      return Response.json({ items: await listGroceryItems() })
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

      const item = await createGroceryItem({ name, category, quantity, priority })

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

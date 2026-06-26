import { userDbActions } from "./db/user-actions"

async function ensureUserAuthenticated(request: Request) {
   const url = new URL(request.url)
   const userId = url.searchParams.get("userId")

   if (!userId) {
      return { result: Response.json({ error: "Missing user ID" }, { status: 400 }) }
   }

   const user = await userDbActions.getUserByClerkId(userId)

   if (!user) {
      return { result: Response.json({ error: "Invalid user ID" }, { status: 404 }) }
   }

   return user
}

export const authHandler = {
   ensureUserAuthenticated,
}

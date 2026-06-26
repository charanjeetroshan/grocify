import { User } from "@/types"

export function isUser(user: unknown): user is User {
   return (
      typeof user === "object" &&
      user !== null &&
      user !== undefined &&
      "id" in user &&
      "clerkId" in user &&
      "email" in user &&
      "createdAt" in user &&
      "registeredVia" in user
   )
}

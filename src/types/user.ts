import { users } from "@/lib/db/schema"

export type User = typeof users.$inferSelect

export type CreateUser = Omit<User, "id">

export type LoggedInUser = Omit<User, "registeredVia" | "clerkId" | "createdAt" | "fullName"> & {
   createdAt: Date | null
}

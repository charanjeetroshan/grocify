import { CreateUser as CreateUserInput } from "@/types"
import { eq } from "drizzle-orm"
import { db } from "./client"
import { users } from "./schema"

const getUserByClerkId = async (clerkId: string) => {
   return await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
   })
}

const getUserByEmail = async (email: string) => {
   return await db.query.users.findFirst({
      where: eq(users.email, email),
   })
}

const createUser = async (item: CreateUserInput) => {
   const rows = await db
      .insert(users)
      .values({ ...item })
      .returning()

   return rows[0]
}

const deleteUserByClerkId = async (clerkId: string) => {
   const rows = await db.delete(users).where(eq(users.clerkId, clerkId)).returning()
   return rows[0]
}

export const userDbActions = {
   getUserByClerkId,
   getUserByEmail,
   createUser,
   deleteUserByClerkId,
}

import { CreateUser } from "@/types"
import type { UserDeletedJSON, UserJSON } from "@clerk/backend"
import { WebhookEvent } from "@clerk/backend/webhooks"
import { userDbActions } from "./db/user-actions"

async function handleCreatedUserEvent(event: Omit<WebhookEvent, "data"> & { data: UserJSON }) {
   const {
      data: { id: clerkId, email_addresses, first_name, last_name, created_at, external_accounts },
   } = event

   const email = email_addresses[0].email_address
   const existing = await userDbActions.getUserByEmail(email)

   if (existing) {
      return console.log(`A user with the email ${email} already exists`)
   }
   const fullName = first_name || last_name ? `${first_name} ${last_name}` : email.split("@")[0]
   const user = {
      clerkId,
      email,
      fullName: fullName.trim(),
      createdAt: created_at,
      registeredVia: external_accounts[0].provider,
   } as const satisfies CreateUser

   await userDbActions.createUser(user)
}

async function handleDeletedUserEvent(event: Omit<WebhookEvent, "data"> & { data: UserDeletedJSON }) {
   const {
      data: { id: clerkId },
   } = event

   if (!clerkId) {
      return console.error("No clerkId found in the 'user.deleted' event")
   }

   const existing = await userDbActions.getUserByClerkId(clerkId)

   if (!existing) {
      return console.error(`No user found with clerkId ${clerkId}`)
   }

   await userDbActions.deleteUserByClerkId(clerkId)
}

export const webhookHandler = {
   handleCreatedUserEvent,
   handleDeletedUserEvent,
}

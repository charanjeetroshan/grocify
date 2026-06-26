import { webhookHandler } from "@/lib"
import { verifyWebhook } from "@clerk/backend/webhooks"

export async function POST(request: Request) {
   try {
      const event = await verifyWebhook(request)

      if (!event) {
         return console.error("Webhook endpoint was hit but no event was delivered")
      }

      if (event.type === "user.created") {
         await webhookHandler.handleCreatedUserEvent(event)
         return Response.json({ message: "Successfully handled 'user.created' event" }, { status: 200 })
      }

      if (event.type === "user.deleted") {
         await webhookHandler.handleDeletedUserEvent(event)
         return Response.json({ message: "Successfully handled 'user.deleted' event" }, { status: 200 })
      }
   } catch (err) {
      console.error("Webhook:", err)
      return Response.json({ error: "Webhook event could not be processed" }, { status: 500 })
   }
}

import { databaseUrl } from "@/lib/db/client"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
   schema: "./src/lib/db/schema.ts",
   out: "./src/lib/db/migrations",
   dialect: "postgresql",
   dbCredentials: {
      url: databaseUrl,
   },
})

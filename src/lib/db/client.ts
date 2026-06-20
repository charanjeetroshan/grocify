import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { mustEnv } from "../env"
import * as schema from "./schema"

export const DATABASE_URL = mustEnv("DATABASE_URL")

const sql = neon(DATABASE_URL)

export const db = drizzle({ client: sql, schema })

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

/*
Setting up neon database configuration:
Caches connections being set.
*/
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error("Database URL not found.");
}

/* Connecting neon database to url */
const sql = neon(process.env.DATABASE_URL);

/* Drizzle function allows variable to call SQL functions on the database */
export const db = drizzle(sql);

import { defineConfig } from "drizzle-kit";
// import "@std/dotenv/load";

// console.log("config", Deno.env.get("DATABASE_URL"));

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "dino",
    database: "dino",
    ssl: false,
  },
});

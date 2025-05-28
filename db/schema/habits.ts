import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

import { users } from "./users";

export const habits = t.pgTable("habits", {
  // id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  id: t.serial().primaryKey(),
  name: t.text(),
  description: t.text(),
  frequency: t.integer(),
  dateCreated: t.timestamp("date_created", { mode: "string" }).defaultNow(),
  dateEnded: t.date(),
  ownerId: t.integer("owner_id").references(() => users.id)
}, (table) => [t.check("frequency_check1", sql`${table.frequency} >= 1 AND ${table.frequency} <= 7`),]);

export const habitDays = t.pgTable("habit_days", {
  id: t.serial().primaryKey(),
  habitId: t.integer("habit_id"),
  date: t.timestamp("date", { mode: "string" }),
})

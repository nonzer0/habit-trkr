import { relations } from 'drizzle-orm';
import {
    boolean,
    date,
    foreignKey,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";
  
  export const dinosaurs = pgTable("dinosaurs", {
    id: serial().primaryKey().notNull(),
    name: text(),
    description: text(),
  });
  
  export const tasks = pgTable("tasks", {
    id: serial().primaryKey().notNull(),
    dinosaurId: integer("dinosaur_id"),
    description: text(),
    dateCreated: timestamp("date_created", { mode: "string" }).defaultNow(),
    isComplete: boolean("is_complete"),
  }, (table) => {
    return {
      tasksDinosaurIdFkey: foreignKey({
        columns: [table.dinosaurId],
        foreignColumns: [dinosaurs.id],
        name: "tasks_dinosaur_id_fkey",
      }),
    };
  });

export const dinosaursRelations = relations(dinosaurs, ({ many }) => ({
	tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
	dinosaurs: one(dinosaurs),
}));
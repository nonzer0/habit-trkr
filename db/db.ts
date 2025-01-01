import { drizzle } from "drizzle-orm/node-postgres";
import {
  dinosaurs as dinosaurSchema,
  dinosaursRelations,
  tasks as taskSchema,
  tasksRelations,
} from "./schema.ts";
import pg from "pg";
import { integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

// Use pg driver.
const { Pool } = pg;

// console.log('db', Deno.env.get('DATABASE_URL'));
const connectionString = Deno.env.get("DATABASE_URL");
// console.log('constring', connectionString);
// Instantiate Drizzle client with pg driver and schema.

export const db = drizzle({
  client: new Pool({
    connectionString,
  }),
  schema: { dinosaurSchema, taskSchema, dinosaursRelations, tasksRelations },
});

// Insert dinosaur.
export async function insertDinosaur(dinosaurObj: typeof dinosaurSchema) {
  return await db.insert(dinosaurSchema).values(dinosaurObj);
}

// Insert task.
export async function insertTask(taskObj: typeof taskSchema) {
  return await db.insert(taskSchema).values(taskObj);
}

// Find dinosaur by id.
export async function findDinosaurById(dinosaurId: typeof integer) {
  return await db.select().from(dinosaurSchema).where(
    eq(dinosaurSchema.id, dinosaurId),
  );
}

// Find dinosaur by name.
export async function findDinosaurByName(name: string) {
  return await db.select().from(dinosaurSchema).where(
    eq(dinosaurSchema.name, name),
  );
}

// Find tasks based on dinosaur id.
export async function findDinosaurTasksByDinosaurId(
  dinosaurId: typeof integer,
) {
  return await db.select().from(taskSchema).where(
    eq(taskSchema.dinosaurId, dinosaurId),
  );
}

// Update dinosaur.
export async function updateDinosaur(dinosaurObj: typeof dinosaurSchema) {
  return await db.update(dinosaurSchema).set(dinosaurObj).where(
    eq(dinosaurSchema.id, dinosaurObj.id),
  );
}

// Update task.
export async function updateTask(taskObj: typeof taskSchema) {
  return await db.update(taskSchema).set(taskObj).where(
    eq(taskSchema.id, taskObj.id),
  );
}

// Delete dinosaur by id.
export async function deleteDinosaurById(id: typeof integer) {
  return await db.delete(dinosaurSchema).where(
    eq(dinosaurSchema.id, id),
  );
}

// Delete task by id.
export async function deleteTask(id: typeof integer) {
  return await db.delete(taskSchema).where(eq(taskSchema.id, id));
}


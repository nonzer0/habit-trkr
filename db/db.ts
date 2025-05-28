import { drizzle } from "drizzle-orm/node-postgres";
import {
  dinosaurs as dinosaurSchema,
  dinosaursRelations,
  habits as habitSchema,
  tasks as taskSchema,
  tasksRelations,
} from "./schema";
import pg from "pg";
import { integer } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

// Use pg driver.
const { Pool } = pg;

// console.log('db', Deno.env.get('DATABASE_URL'));
const connectionString = process.env.DATABASE_URL;
// console.log('constring', connectionString);
// Instantiate Drizzle client with pg driver and schema.

type OptionalDino = {
  id: number;
  name: string | null;
  description: string | null;
};

type Dino = {
  name: string;
  description: string;
};

type DinoRecord = Dino & { id: number };

export const db = drizzle({
  client: new Pool({
    connectionString,
  }),
  schema: { dinosaurSchema, habitSchema, taskSchema, dinosaursRelations, tasksRelations },
});

export function getAllDinosaurs(
  offset: number = 0,
  itemLimit: number = 25,
): Promise<
  Array<OptionalDino> | null
> {
  return db
    .select()
    .from(dinosaurSchema)
    .orderBy(dinosaurSchema.name)
    .limit(itemLimit)
    .offset(offset);
}

export async function getAllDinosHandler(): Promise<Response> {
  const dinosaurs = await getAllDinosaurs(); // Fetch the dinosaur data
  return new Response(JSON.stringify(dinosaurs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Find dinosaur by id.
export function findDinosaurById(
  dinosaurId: typeof integer,
): Promise<Array<OptionalDino>> | null {
  return db
    .select()
    .from(dinosaurSchema)
    .where(
      eq(dinosaurSchema.id, dinosaurId),
    );
}

export async function getDinoByIdHandler(
  dinosaurId: typeof integer,
): Promise<Response> {
  const dinosaurs = await findDinosaurById(dinosaurId); // Fetch the dinosaur data
  return new Response(JSON.stringify(dinosaurs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Insert dinosaur.
export async function insertDinosaur(dinosaurObj: typeof dinosaurSchema) {
  return await db
    .insert(dinosaurSchema)
    .values(dinosaurObj);
}

// Insert task.
export async function insertTask(taskObj: typeof taskSchema) {
  return await db.insert(taskSchema).values(taskObj);
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

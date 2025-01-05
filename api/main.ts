import { Hono } from "@hono/hono";
import { getAllDinosaurs } from "../db/db.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to the dinosaur API!");
});

app.get("/api/dinosaurs/:page", async (c) => {
  const { page } = c.req.param();
  const offset = Number(page) * 25;
  const dinosaurs = await getAllDinosaurs(offset); // Fetch the dinosaur data
  return c.body(JSON.stringify(dinosaurs), 200, {
    "Content-Type": "application/json",
  });
});

app.get("api/dinosaurs/:id", async (c) => {
  const 
})

app.notFound((c) => {
  return c.text("404 Message", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Error Message", 500);
});
// app.get("/api/dinosaurs/:dinosaur", (c) => {
//   if (!c.req.param("dinosaur")) {
//     return c.text("No dinosaur name provided.");
//   }
//
//   const dinosaur = data.find((item) =>
//     item.name.toLowerCase() === c.req.param("dinosaur").toLowerCase()
//   );
//
//   console.log(dinosaur);
//
//   if (dinosaur) {
//     return c.json(dinosaur);
//   } else {
//     return c.notFound();
//   }
// });

Deno.serve(app.fetch);

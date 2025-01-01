import {
  deleteDinosaurById,
  findDinosaurByName,
  insertDinosaur,
  insertTask,
  updateDinosaur,
} from "../../../db/db.ts";

import { dinos as dataArray } from "../../../api/data.ts";

function seed() {
  dataArray.map((dino) => {
    // Create a new dinosaur.
    insertDinosaur({
      name: dino.name,
      description: dino.description,
    });
  });
}
seed();
// Find that dinosaur by name.
// const res = await findDinosaurByName(dino.name);

// Create a task with that dinosaur by its id.
// await insertTask({
//   dinosaurId: res.id,
//   description: "Remove unnecessary config.",
//   isComplete: false,
// });
// Update a dinosaur with a new description.
// const newDeno = {
//   id: res.id,
//   name: "Denosaur",
//   description: "The simplest dinosaur.",
// };
// await updateDinosaur(newDeno);

// Delete the dinosaur (and any tasks it has).
// await deleteDinosaurById(res.id);

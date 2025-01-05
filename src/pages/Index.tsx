import { createEffect, createSignal, For, onMount } from "solid-js";
import { A } from "@solidjs/router";
import { createPagination } from "@solid-primitives/pagination";
import type { Dino } from "../types.ts";

export default function Index() {
  const [dinosaurs, setDinosaurs] = createSignal<Dino[]>([]);
  const [paginationProps, page, setPage] = createPagination({ pages: 100 });

  async function fetchDinos(page: number) {
    try {
      const response = await fetch(`/api/dinosaurs/${page}`);
      const allDinosaurs = (await response.json()) as Dino[];
      setDinosaurs(allDinosaurs);
      console.log("Fetched dinosaurs:", allDinosaurs);
    } catch (error) {
      console.error("Failed to fetch dinosaurs:", error);
    }
  }

  onMount(() => {
    fetchDinos(page());
  });

  createEffect(() => {
    fetchDinos(page());
  })

  return (
    <main>
      <h1>The Dinosaur app</h1>
      <p>Click on a dinosaur to learn more.</p>
      <For each={dinosaurs()}>
        {(dinosaur) => (
          <A href={`/${dinosaur.name.toLowerCase()}`} class="dinosaur">
            {dinosaur.name}
          </A>
        )}
      </For>
      <div>current page {page()}</div>
      <nav class="pagination">
        <For each={paginationProps()}>{props => <button {...props} />}</For>
      </nav>
    </main>
  );
}

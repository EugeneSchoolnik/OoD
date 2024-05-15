import { writable } from "svelte/store";

type user = {
  group: "user" | "manager" | "admin";
};

export const user = writable<user>({ group: "user" });

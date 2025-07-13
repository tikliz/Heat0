import { writable } from "svelte/store";

export const activeIndex = writable(0);
export const sectionRefs: HTMLElement[] = [];
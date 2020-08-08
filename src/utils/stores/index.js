import { writable } from 'svelte/store';

export { mainMenuPages } from './mainMenuPages';
export const activeProduct = writable({});
export const productDetailsVisibility = writable(false);
export const mainMenuVisibility = writable(false);
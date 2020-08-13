import { writable } from 'svelte/store';

export { mainMenuPages } from './mainMenuPages';
export const currDetailedProduct = writable({});
export const detailedProductVisibility = writable(false);
export const mainMenuVisibility = writable(false);
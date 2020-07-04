import * as NavSublinks from './navSublinks';
import { writable } from 'svelte/store';

export { NavSublinks };
export const activeProduct = writable({});
export const productDetailsVisibility = writable(false);
export const mainMenuVisibility = writable(false);
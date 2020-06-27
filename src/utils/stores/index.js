import * as NavSublinks from './navSublinks';
import { writable } from 'svelte/store';

export { NavSublinks };
export const activeProduct = writable({});
export const mainMenuVisibility = writable(false);
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
const svelteConfig = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const onwarn = (warning, onwarn) =>
	(warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
	(warning.code === "CIRCULAR_DEPENDENCY" && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"preventAssignment": true
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
				...svelteConfig
			}),
			resolve({
				browser: true,
				dedupe: ["svelte"]
			}),
			commonjs(),
			!dev && terser({
				module: true
			})
		],

		preserveEntrySignatures: false,
		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				"process.browser": false,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"preventAssignment": true
			}),
			svelte({
				generate: "ssr",
				hydratable: true,
				dev,
				...svelteConfig
			}),
			resolve({
				dedupe: ["svelte"]
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

		preserveEntrySignatures: 'strict',
		onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				"process.browser": true,
				"process.env.NODE_ENV": JSON.stringify(mode),
				"preventAssignment": true
			}),
			commonjs(),
			!dev && terser()
		],

		preserveEntrySignatures: false,
		onwarn,
	}
};
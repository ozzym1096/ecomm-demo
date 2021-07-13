const sveltePreprocess = require("svelte-preprocess");

module.exports = {
	preprocess: sveltePreprocess({
		sourceMap: true,
		postcss: true,
		defaults: {
			style: "postcss"
		}
	}),
};
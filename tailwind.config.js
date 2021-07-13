const production = process.env.NODE_ENV === "production";

module.exports = {
	plugins: [
		require("@tailwindcss/aspect-ratio"),
	],
	purge: {
		content: [
			"./src/**/*.svelte",
			"./src/**/*.html"
		],
		layers: [
			"utilities"
		],
		enabled: production,
	},
}
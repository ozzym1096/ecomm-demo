<script context="module">
	export async function preload(_, session) {
		const { CLOUDINARY_NAME: cloud_name } = session;
		return { cloud_name };
	}
</script>

<script>
	export let cloud_name;

	import MainNav from "../components/MainNav.svelte";
	import { initialize } from "svelte-cloudinary";

	initialize({
		cloud_name,
	});
</script>

<MainNav />
<main class="bg-gray-100 px-7 pt-3 pb-24 sm:pb-10 sm:px-12 md:px-16 lg:px-20">
	<slot />
</main>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

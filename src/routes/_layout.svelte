<script context="module">
	export async function preload(_, session) {
		const { CLOUDINARY_NAME: cloud_name } = session;
		return { cloud_name };
	}
</script>

<script>
	export let cloud_name;

	import GlobalStyles from "../components/GlobalStyles.svelte";
	import TailwindExtensions from "../components/TailwindExtensions.svelte";
	import MainNav from "../components/MainNav.svelte";
	import { initialize } from "svelte-cloudinary";

	initialize({
		cloud_name,
	});
</script>

<GlobalStyles />
<TailwindExtensions />
<MainNav />
<main class="px-7 pb-32">
	<slot />
</main>

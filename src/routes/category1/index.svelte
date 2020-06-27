<script>
	import { NavSublinks } from "../../utils/stores";
	const { cat1 } = NavSublinks;
</script>

<svelte:head>
	<title>Category 1 Pages</title>
</svelte:head>

<ul>
	{#each cat1 as link}
		<li>
			<a href="{link[1]}">{link[0]}</a>
		</li>
	{/each}
</ul>

<script>
	export let status;
	export let error;

	const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
	<title>{status}</title>
</svelte:head>

<h1 class="mb-2 text-5xl font-bold sm:text-7xl">{status}</h1>

<p class="my-4 mx-auto">{error.message}</p>

{#if dev && error.stack}
	<pre>{error.stack}</pre>
{/if}

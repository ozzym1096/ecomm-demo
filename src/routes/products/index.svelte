<script context="module">
	import { frontPageProducts } from "../../stores";
	import ProductCard from "../../components/ProductCard.svelte";

	/**
	 * Query database using filters
	 * @param filterInfo An object with syntax {filterName: filterArgs[, ...]}
	 *
	 * @returns Array with product data
	 */
	function createFilterQueryString(filterInfo) {
		let queryString = [];

		for (const filter in filterInfo) {
			queryString.push(
				`${filter}=${filterInfo[filter]
					.toLowerCase()
					.replace(/^\w/, (f) => f.toUpperCase())}`
			);
		}

		return queryString.join("&");
	}

	export async function preload(page) {
		let filteredProducts = [];

		if (Object.entries(page.query).length) {
			const queryString = createFilterQueryString(page.query);
			const queryResult = await this.fetch(
				`api/products.json?${queryString}`
			);
			filteredProducts = await queryResult.json();

			return {
				filteredProducts,
				filterIsInUse: true,
			};
		} else {
			return {
				filteredProducts,
				filterIsInUse: false,
			};
		}
	}
</script>

<script>
	export let filteredProducts;
	export let filterIsInUse;

	import { onMount } from "svelte";
	import { stores } from "@sapper/app";

	const { page } = stores();
	$: mainText = filterIsInUse
		? "X, Y, and Z filters active"
		: "No filters active";

	onMount(() => {
		if (!$frontPageProducts.length) {
			(async () => {
				const frontPageProductsData = await fetch("api/products.json");
				frontPageProducts.set(await frontPageProductsData.json());
			})();
		}
	});
</script>

<svelte:head>
	<title>Products - Craaaiiig's</title>
	<meta
		name="description"
		content="Product search for all products available at Craaaiiig's" />
</svelte:head>

<section>
	<div class="bg-blue-900 px-5 py-3">
		<h1 class="text-white font-bold">
			{mainText}
		</h1>
	</div>
	{#if filterIsInUse}
		{#if filteredProducts.length}
			<ul class="card-list">
				{#each filteredProducts as product}
					<ProductCard product="{product}" />
				{/each}
			</ul>
		{:else}
			<p>There are no matching products</p>
		{/if}
	{:else}
		<ul class="card-list">
			{#each $frontPageProducts as product}
				<ProductCard product="{product}" />
			{/each}
		</ul>
	{/if}
</section>

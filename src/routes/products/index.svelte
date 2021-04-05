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
			queryString.push(`${filter}=${filterInfo[filter]}`);
		}

		return queryString.join("&");
	}

	export async function preload(page) {
		let filteredProducts = [];

		if (Object.entries(page.query).length) {
			const queryString = createFilterQueryString(page.query);
			const queryResult = await this.fetch(
				`products.json?${queryString}`
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

	onMount(() => {
		if (!$frontPageProducts.length) {
			(async () => {
				const frontPageProductsData = await fetch("products.json");
				frontPageProducts.set(await frontPageProductsData.json());
			})();
		}
	});
</script>

<svelte:head>
	<title>All Products - Craaaiiig's</title>
	<meta
		name="Description"
		content="List of all products offered by Craaaiiig's"
	/>
</svelte:head>

<section id="products" class="products">
	{#if filterIsInUse}
		{#if filteredProducts.length}
			<ul class="products-grid cards-list">
				{#each filteredProducts as product}
					<ProductCard product="{product}" />
				{/each}
			</ul>
		{:else}
			<h1>There are no matching products</h1>
		{/if}
	{:else}
		<div class="products-title">
			<h1 class="products-title-text">All Products</h1>
		</div>
		<ul class="products-grid cards-list">
			{#each $frontPageProducts as product}
				<ProductCard product="{product}" />
			{/each}
		</ul>
	{/if}
</section>

<style>
	.products-grid {
		display: grid;
		grid-row-gap: 1vh;
		grid-column-gap: 2vw;
	}

	.products-title {
		width: 100%;
		background-color: var(--color-blue-light);
		color: var(--color-blue-dark);
		margin-bottom: 5vh;
	}

	.products-title-text {
		font-size: var(--font-size-xlarge);
		font-weight: var(--font-weight-boldest);
		line-height: 1.3;
		width: min-content;
		padding-left: 6vw;
		padding-bottom: 3vh;
		padding-top: 7vh;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.products-grid {
			grid-row-gap: 3vh;
		}

		.products-title-text {
			padding-left: 5vh;
		}
	}

	@media (min-width: 671px) and (min-height: 501px) {
		.products-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 170px));
			justify-content: center;
		}

		.products-title-text {
			font-size: var(--font-size-xxlarge);
			padding-left: 4vh;
			padding-top: 7vh;
		}
	}
</style>

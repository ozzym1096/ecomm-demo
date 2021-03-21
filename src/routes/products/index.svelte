<script context="module">
	export async function preload(page, session) {
		const queryString = [];
		for (let query in page.query) {
			queryString.push(
				`${query}=${page.query[query]
					.toLowerCase()
					.replace(/^\w/, (f) => f.toUpperCase())}`
			);
		}
		const res = await this.fetch(
			`products.json${
				queryString.length === 0 ? "" : "?" + queryString.join("&")
			}`
		);
		const data = await res.json();

		return {
			products: data,
		};
	}
</script>

<script>
	export let products;

	import ProductCard from "../../components/ProductCard.svelte";
</script>

<svelte:head>
	<title>All Products - Craaaiiig's</title>
	<meta
		name="Description"
		content="List of all products offered by Craaaiiig's"
	/>
</svelte:head>

<section id="products" class="products">
	<div class="products-grid-feat">
		<h1 class="products-grid-feat-text">Featured Products</h1>
	</div>
	<ul class="products-grid cards-list">
		{#if products.length}
			{#each products as product}
				<ProductCard product="{product}" />
			{/each}
		{:else}
			<li>
				<h1>There are no matching products</h1>
			</li>
		{/if}
	</ul>
</section>

<style>
	.products-grid {
		display: grid;
		grid-row-gap: 1vh;
		grid-column-gap: 2vw;
	}

	.products-grid-feat {
		width: 100%;
		background-color: var(--color-blue-light);
		color: var(--color-blue-dark);
		margin-bottom: 5vh;
	}

	.products-grid-feat-text {
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

		.products-grid-feat-text {
			padding-left: 5vh;
		}
	}

	@media (min-width: 671px) and (min-height: 501px) {
		.products-grid {
			grid-template-columns: repeat(auto-fit, minmax(120px, 170px));
			justify-content: center;
		}

		.products-grid-feat-text {
			font-size: var(--font-size-xxlarge);
			padding-left: 4vh;
			padding-top: 7vh;
		}
	}
</style>

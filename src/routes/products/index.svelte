<script context="module">
	export async function preload(page, session) {
		const { CLOUDINARY_NAME } = session;

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
			cloud_name: CLOUDINARY_NAME,
		};
	}
</script>

<script>
	export let products;
	export let cloud_name;

	import { initialize } from "svelte-cloudinary";
	import ProductCard from "../../components/ProductCard.svelte";

	initialize({ cloud_name });
</script>

<svelte:head>
	<title>All Products - Craaaiiig's</title>
	<meta
		name="Description"
		content="List of all products offered by Craaaiiig's"
	/>
</svelte:head>

<section id="products" class="products">
	<div class="l-wrapper">
		<div class="products-grid-feat">
			<h1 class="products-grid-feat-text">Featured Products</h1>
		</div>
		<button type="button">Filter</button>
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
	</div>
</section>

<style>
	.products-grid {
		display: grid;
		grid-row-gap: 1rem;
		grid-column-gap: 2rem;
	}

	.products-grid-feat {
		width: 100%;
		background-color: var(--color-blue-light);
		color: var(--color-blue-dark);
	}

	.products-grid-feat-text {
		font-size: var(--font-size-xlarge);
		font-weight: var(--font-weight-boldest);
		line-height: 1.3;
		width: min-content;
		margin-left: 0.5em;
		margin-right: 0.5em;
		padding-bottom: 0.5em;
		padding-top: 50px;
	}
</style>

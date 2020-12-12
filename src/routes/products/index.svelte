<script context="module">
	export async function preload(page, session) {
		const { CLOUDINARY_NAME } = session;
		const res = await this.fetch("products.json");
		const data = await res.json();
		return { products: data, clName: CLOUDINARY_NAME };
	}
</script>

<script>
	export let products;
	export let clName;

	import { initialize } from "svelte-cloudinary";
	import ProductCard from "../../components/ProductCard.svelte";
	import ProductDialog from "../../components/ProductDialog.svelte";

	initialize({ cloud_name: clName });
</script>

<svelte:head>
	<title>home</title>
</svelte:head>

<section id="products" class="products">
	<div class="l-wrapper">
		<ul class="products-grid cards-list">
			<li class="products-grid-feat">
				<h1 class="font-xxxlarge">Featured Products</h1>
			</li>
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</ul>
	</div>
	<ProductDialog />
</section>

<style>
	.products {
		margin-bottom: 10vh;
	}

	.products-grid {
		display: grid;
		grid-row-gap: 1em;
		grid-column-gap: 2em;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	}

	.products-grid-feat {
		width: 100%;
		grid-area: 1 / 1 / span 1 / span 1;
		display: flex;
		align-items: flex-end;
		background-color: var(--color-secondary-light);
		color: var(--color-secondary-dark);
	}

	.products-grid-feat > h1 {
		width: min-width;
		margin-left: 0.5em;
		margin-right: 0.5em;
		margin-bottom: 0.5em;
		margin-top: 70px;
	}

	@media (orientation: landscape) {
		.products-grid-feat {
			grid-area: 1 / 1 / span 1 / span 4;
		}
	}
</style>

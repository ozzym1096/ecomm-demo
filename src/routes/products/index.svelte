<script context="module">
	export async function preload() {
		const res = await this.fetch("products.json");
		const data = await res.json();
		return { products: data };
	}
</script>

<script>
	export let products;

	import ProductCard from "../../components/ProductCard.svelte";
	import ProductDialog from "../../components/ProductDialog.svelte";
	import { Cloudinary } from "cloudinary-core";

	const cl = new Cloudinary({ cloud_name: "dmi84pjlo", secure: true });
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
				<ProductCard {product} {cl} />
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
		grid-auto-columns: minmax(auto, 1fr);
	}

	.products-grid-feat {
		width: 100%;
		grid-area: 1 / 1 / span 1 / span 2;
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

<script context="module">
	export async function preload() {
		const productsJson = await this.fetch("products.json");
		const products = await productsJson.json();
		products.forEach((product) => {
			const oldUrl = product.image;
			product.image =
				oldUrl.slice(0, 49) + "f_auto,q_auto/" + oldUrl.slice(49);
		});
		return { products };
	}
</script>

<script>
	import ProductCard from "../components/ProductCard";
	import ProductDetails from "../components/ProductDetails.svelte";

	export let products;
</script>

<svelte:head>
	<title>home</title>
</svelte:head>

<section class="products">
	<div class="wrapper">
		<div class="products-grid">
			<div class="products-feat">
				<h1>Featured Products</h1>
			</div>
			{#each products as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>
<ProductDetails />

<style>
	.products {
		margin: 0 0 12vh;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 255px));
		grid-row-gap: 1em;
		grid-column-gap: 2em;
		justify-items: center;
	}

	.products-feat {
		grid-area: 1 / 1 / span 1 / span 1;
		background-color: var(--secondary-light);
		color: var(--secondary-dark);
		display: flex;
		align-items: flex-end;
	}

	.products-feat > h1 {
		font-size: 2em;
		font-weight: 700;
		margin: 0.5em;
	}
</style>

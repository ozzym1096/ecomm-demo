<script context="module">
	export async function preload() {
		const productsJson = await this.fetch('products.json');
		const products = await productsJson.json();
		products.forEach(product => {
			const oldUrl = product.image;
			product.image = oldUrl.slice(0, 49) + "f_auto,q_auto/" + oldUrl.slice(49);
		});
		return {products};
	}
	
</script>

<script>
	import Product from '../components/ProductCard';
	
	export let products;

</script>

<style>
	.products {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		grid-row-gap: 1em;
		grid-column-gap: 2em;
		margin: 0 0 12vh;
		justify-items: center;
	}

	.products-feat {
		grid-area: 1 / 1 / span 1 / span 1;
		background-color: var(--secondary-light);
		color: var(--secondary-dark);
		display: flex;
		align-items: flex-end;
		width: 100%;
		height: 100%;
	}

	.products-feat > h1 {
		font-size: 2em;
		font-weight: 700;
		margin: 0.5em;
		width: max-content;
	}
</style>

<svelte:head>
	<title>home</title>
</svelte:head>

<section class="products">
	<div class="products-feat">
		<h1>Featured Products</h1>
	</div>
	{#each products as product}
		<Product {product}/>
	{/each}
</section>

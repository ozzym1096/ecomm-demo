<script context="module">
	export async function preload() {
		const res = await this.fetch("products.json");
		let data = await res.json();
		data.forEach((product) => {
			product.image =
				product.image.slice(0, 49) +
				"f_auto,q_auto/" +
				product.image.slice(49);
		});
		return { products: data };
	}
</script>

<script>
	import ProductCard from "../../components/ProductCard.svelte";
	import ProductDialog from "../../components/ProductDialog.svelte";

	export let products;
</script>

<svelte:head>
	<title>home</title>
</svelte:head>

<!-- @component /index -->
<section class="products">
	<div class="l-wrapper" style="--padding: 0px;">
		<ul class="products-grid cards-list">
			<li class="products-grid-feat">
				<h1 class="font-base">Featured Products</h1>
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
		margin-bottom: 12vh;
	}

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		grid-row-gap: 1em;
		grid-column-gap: 2em;
		justify-items: center;
	}

	.products-grid-feat {
		width: 100%;
		height: 100%;
		grid-area: 1 / 1 / span 1 / span 1;
		display: flex;
		align-items: flex-end;
		background-color: var(--color-secondary-light);
		color: var(--color-secondary-dark);
	}

	.products-grid-feat > h1 {
		font-weight: 600;
		margin-left: 0.5em;
		margin-right: 0.5em;
		margin-bottom: 0.5em;
		margin-top: 70px;
	}
</style>

<script>
	/**
	 * Product details displayed in home page grid
	 */

	import { productDetailsVisibility, activeProduct } from "../utils/stores";
	import { openDialog } from "../utils/classes/dialog";

	/**
	 * @type {{
	 * 	id: string,
	 * 	name: string,
	 * 	department: string,
	 * 	price: number,
	 * 	adjectives: string[],
	 * 	materials: string[],
	 * 	description: string,
	 * 	image: string
	 * }}
	 */
	export let product;
</script>

<a
	class="product"
	href="#product-details"
	on:click|preventDefault="{(e) => {
		activeProduct.set(product);
		openDialog(productDetailsVisibility, document.getElementById('product-details'), e.target, document.querySelector('#product-details a'));
	}}"
>
	<div
		class="image-div"
		style="background-image: url({product.image});"
	></div>
	<div class="info">
		<h2 class="info-name">{product.name}</h2>
		<p class="info-price">${product.price}</p>
	</div>
</a>

<style>
	.product,
	.info {
		display: flex;
		flex-direction: column;
	}

	.product {
		text-decoration: none;
		width: 100%;
	}

	.image-div {
		position: relative;
		width: 100%;
		height: 25vh;
		min-height: 185px;
		background-position: center;
		background-size: cover;
	}

	.info {
		padding: 1em 0 0 0;
	}

	.info-name {
		margin: 0;
	}
</style>

<script>
	import {
		detailedProductVisibility,
		currDetailedProduct,
	} from "../utils/stores";
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
	export let cl;
</script>

<li class="product-card">
	<a
		class="product-card-link"
		href="/products/{product.id}"
		on:click|preventDefault="{(e) => {
			currDetailedProduct.set(product);
			openDialog(detailedProductVisibility, document.getElementById('product-detailed'), e.target, document
					.getElementById('product-detailed')
					.querySelector('a'));
		}}"
	>
		<img
			class="product-card-image card-image"
			src="{cl.url(`ecomm-demo\/${product.image}.jpg`)}"
			alt=""
		/>
		<div class="product-card-info card-info">
			<h2 class="product-card-info-name font-base">{product.name}</h2>
			<p>${product.price}</p>
		</div>
	</a>
</li>

<style>
	.product-card {
		width: 100%;
	}

	.product-card-link {
		text-decoration: none;
		display: flex;
		flex-direction: column;
	}

	.product-card-image {
		height: auto;
		width: 100%;
		object-position: center;
		object-fit: cover;
	}

	.product-card-info-name {
		text-decoration: underline;
	}
</style>

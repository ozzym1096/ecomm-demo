<script>
	/**
	 * @type {{
	 * 	id: string,
	 * 	name: string,
	 * 	department: string,
	 * 	price: number,
	 * 	materials: string[],
	 * 	description: string,
	 * 	image: string
	 * }}
	 */
	export let product;

	import { image } from "svelte-cloudinary";
	import {
		detailedProductVisibility,
		currDetailedProduct,
	} from "../utils/stores";
	import { openDialog } from "../utils/classes/dialog";
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
			use:image="{{ src: `\/ecomm-demo\/${product.image}`, bind: true, lazy: true, options: { crop: 'lfill', gravity: 'auto' } }}"
			class="product-card-image card-content"
			alt="{`Product photo of ${product.name}`}"
		/>
		<div class="product-card-info card-info card-content">
			<h2 class="product-card-info-name">{product.name}</h2>
			<p>${product.price}</p>
		</div>
	</a>
</li>

<style>
	.product-card-link {
		border: 1px solid hsl(0deg 0% 95%);
		text-decoration: none;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-content {
		margin-left: 5%;
	}

	.product-card-image {
		width: 100px;
		height: 125px;
		margin-top: 1rem;
		margin-bottom: 1rem;
		object-position: center;
		object-fit: cover;
	}

	.product-card-info {
		max-width: 20ch;
	}

	.product-card-info-name {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-reg);
		text-decoration: underline;
	}

	@media (min-width: 480px) {
		.product-card-info {
			max-width: initial;
		}
	}
</style>

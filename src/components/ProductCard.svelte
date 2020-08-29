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
</script>

<!-- @component Show in grid on home page -->
<li class="product-card">
	<a
		href="/products/{product.id}"
		on:click|preventDefault="{(e) => {
			currDetailedProduct.set(product);
			openDialog(detailedProductVisibility, document.getElementById('product-detailed'), e.target, document
					.getElementById('product-detailed')
					.querySelector('a'));
		}}"
	>
		<img
			class="lazyload product-card-image"
			data-src="{product.image}"
			alt=""
		/>
		<div class="card-info">
			<h2 class="card-info-name">
				<span
					class="underlined"
					style="--underline-color: currentColor;"
				>
					{product.name}
				</span>
			</h2>
			<p class="card-info-price">${product.price}</p>
		</div>
	</a>
</li>

<style>
	.product-card,
	.card-info {
		display: flex;
		flex-direction: column;
	}

	.product-card {
		width: 100%;
	}

	.product-card-image {
		position: relative;
		width: 100%;
		height: 25vh;
		min-height: 185px;
		object-position: center;
		object-fit: cover;
	}

	.card-info {
		padding-top: 1em;
	}
</style>

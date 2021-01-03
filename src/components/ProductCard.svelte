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
</script>

<li class="product-card">
	<a class="product-card-link" href="/products/{product.id}">
		<div class="product-card-image card-content">
			<div class="product-card-image-arbox"></div>
			<div class="product-card-image-content">
				<img
					use:image="{{ src: `\/ecomm-demo\/products\/${product.image}`, bind: '.product-card-image-content', step: 5, lazy: true, options: { crop: 'fill', gravity: 'auto' } }}"
					style="width: 100%; height: 100%;"
					alt="{`Product photo of ${product.name}`}"
				/>
			</div>
		</div>
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
		width: 28%;
		position: relative;
		box-sizing: border-box;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.product-card-image-arbox {
		padding-bottom: 125%;
	}

	.product-card-image-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.product-card-info {
		max-width: 20ch;
		flex-grow: 1;
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

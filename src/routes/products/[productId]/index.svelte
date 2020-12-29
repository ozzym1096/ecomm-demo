<script context="module">
	export async function preload(page, session) {
		const { CLOUDINARY_NAME } = session;
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();
		return { product: data, clName: CLOUDINARY_NAME };
	}
</script>

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
	export let clName;

	import { initialize, image } from "svelte-cloudinary";
	import StarRating from "svelte-stars-rating";

	initialize({ cloud_name: clName });
</script>

<div class="l-wrapper">
	<nav aria-label="Breadcrumb" class="breadcrumb">
		<ol class="breadcrumb-list">
			<li class="breadcrumb-item"><a href="products">Products</a></li>
			<li class="breadcrumb-item">
				<a
					href="{`products?department=${product.department}`}"
				>{product.department}</a>
			</li>
		</ol>
	</nav>
	<article class="product">
		<p class="product-id">SKU: {product.id}</p>
		<h2 class="product-name">{product.name}</h2>
		<div class="product-image">
			<div class="product-image-arbox"></div>
			<div class="product-image-content">
				<img
					use:image="{{ src: `\/ecomm-demo\/${product.image}`, bind: '.product-image-content', step: 100, lazy: false, options: { crop: 'lfill', gravity: 'auto' } }}"
					style="width: 100%; height: 100%;"
					alt="{`Photo of ${product.name}`}"
				/>
			</div>
		</div>
		<div class="container-price-and-rating">
			<p class="product-price">${product.price}</p>
			<div class="product-rating">
				<StarRating
					rating="{3.5}"
					isIndicatorActive="{false}"
					style="{{ styleStarWidth: 15, styleEmptyStarColor: 'hsl(0, 0%, 10%)', styleFullStarColor: 'hsl(15, 100%, 43%)' }}"
				/>
			</div>
		</div>
		<div class="container-quantity-and-cart">
			<select class="product-quantity">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<button class="button-cart" type="button">Add to cart</button>
		</div>
		<div class="product-description">
			<h3 class="product-description-slogan">Product Sales Pitch:</h3>
			<p class="product-description-text">{product.description}</p>
		</div>
	</article>
</div>

<style>
	.breadcrumb {
		font-size: var(--font-size-small);
	}

	.product {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.product > :first-child {
		margin-top: 0;
		margin-bottom: 0;
	}

	.product-id {
		font-size: var(--font-size-small);
	}

	.product-name {
		font-size: var(--font-size-base);
	}

	.product-image {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	.product-image-arbox {
		padding-bottom: 110%;
	}

	.product-image-content {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.container-price-and-rating {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.product-price {
		font-size: var(--font-size-xlarge);
	}

	.container-quantity-and-cart {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 1em;
	}

	.product-quantity {
		width: 4em;
		font-size: var(--font-size-base);
		padding-top: 0.5em;
		padding-bottom: 0.5em;
		padding-right: 1em;
		padding-left: 1em;
	}

	.button-cart {
		margin-left: 2em;
		flex-grow: 1;
	}

	.product-description-slogan {
		margin-bottom: 0;
	}

	.product-description-text {
		margin-top: 0.5em;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.product-image {
			width: 70%;
			align-self: center;
		}

		.product-description {
			max-width: 60ch;
		}
	}
</style>

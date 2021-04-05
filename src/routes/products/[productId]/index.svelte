<script context="module">
	export async function preload(page, _) {
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();

		return { product: data };
	}
</script>

<script>
	export let product;

	import { image } from "svelte-cloudinary";
	import StarRating from "svelte-stars-rating";
</script>

<svelte:head>
	<title>{product.name} - Craaaiiig's</title>
</svelte:head>

<nav aria-label="Breadcrumb" class="breadcrumb">
	<ol class="breadcrumb-list">
		<li class="breadcrumb-item"><a href="products">Products</a></li>
		<li class="breadcrumb-item">
			<a href="{`products?department=${product.department}`}"
				>{product.department}</a
			>
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
				use:image="{{
					src: `\/ecomm-demo\/products\/${product.imageName}`,
					bind: '.product-image-content',
					step: 100,
					lazy: false,
					options: { crop: 'lfill', gravity: 'auto' },
				}}"
				style="width: 100%; height: 100%;"
				alt="{product.name}"
			/>
		</div>
	</div>
	<div class="container-price-and-rating">
		<p class="product-price">${product.priceUsd}</p>
		<div class="product-rating">
			<StarRating
				rating="{product.rating}"
				isIndicatorActive="{false}"
				style="{{
					styleStarWidth: 15,
					styleEmptyStarColor: 'hsl(0, 0%, 10%)',
					styleFullStarColor: 'hsl(15, 100%, 43%)',
				}}"
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
	<ul>
		{#each product.materials as material}
			<li>{material}</li>
		{/each}
	</ul>
</article>

<style>
	.breadcrumb {
		font-size: var(--font-size-small);
		margin-bottom: 5vh;
	}

	.product {
		display: flex;
		flex-direction: column;
	}

	.product-id {
		font-size: var(--font-size-small);
		margin-bottom: 1vh;
	}

	.product-name {
		font-size: var(--font-size-base);
		margin-bottom: 1vh;
	}

	.product-image {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		margin-bottom: 5vh;
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
		margin-bottom: 4vh;
	}

	.product-price {
		font-size: var(--font-size-xlarge);
	}

	.container-quantity-and-cart {
		height: 2.2em;
		display: flex;
		align-items: center;
		margin-bottom: 6vh;
	}

	.product-quantity {
		width: 3.5em;
		height: 100%;
		font-size: var(--font-size-base);
		padding-left: 1em;
	}

	.button-cart {
		height: 100%;
		font-size: var(--font-size-base);
		margin-left: 2em;
		flex-grow: 1;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.product-id {
			margin-bottom: 2vh;
		}

		.product-name {
			margin-bottom: 3vh;
		}

		.product-image {
			width: 70%;
			align-self: center;
		}

		.product-description {
			max-width: 60ch;
		}
	}

	@media (min-width: 671px) and (min-height: 501px) {
		.product {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 4vw;
		}

		.product-image {
			grid-area: 1 / 1 / span 6 / span 1;
		}

		.product-id {
			grid-area: 1 / 2 / span 1 / span 1;
		}

		.product-name {
			grid-area: 2 / 2 / span 1 / span 1;
		}

		.container-price-and-rating {
			margin-bottom: 3vh;
		}

		.container-quantity-and-cart {
			margin-bottom: 4vh;
		}
	}
</style>

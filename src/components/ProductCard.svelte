<script>
	/**
	 * Displayed in home page grid
	 * @component ProductCard
	 */
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

<!--
/**
 * Displayed in home page grid
 */
-->
<div class="product">
	<div class="image-div">
		<img class="image" src="{product.image}" alt="" />
	</div>
	<div class="info">
		<h2 class="info-name">{product.name}</h2>
		<p class="info-price">${product.price}</p>
	</div>
</div>

<style>
	.product,
	.info {
		display: flex;
		flex-direction: column;
	}

	.image-div {
		position: relative;
	}

	.image-div:after {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		box-shadow: inset 0px 0px 8px 0px #e8e8e8;
	}

	.image {
		width: 100%;
		height: 25vh;
		min-height: 185px;
		object-fit: cover;
		vertical-align: middle;
	}

	.info {
		padding: 1em 0 0 0;
	}

	.info-name {
		margin: 0;
	}
</style>

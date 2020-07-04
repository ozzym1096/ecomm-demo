<script>
	/**
	 * Component shown when ProductCard component in home page grid is pressed
	 */

	import { activeProduct, productDetailsVisibility } from "../utils/stores";
	import { closeDialog } from "../utils/classes/dialog";

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
	$: product = $activeProduct;
</script>

<div
	id="product-details"
	aria-label="Product details"
	aria-expanded="{$productDetailsVisibility ? 'true' : 'false'}"
>
	<span class="detail">{product.name}</span>
	<span class="detail">{product.id}</span>
	<span class="detail">${product.price}</span>
	<span class="detail">{product.department}</span>
	<span class="detail">{product.description}</span>
	<span class="detail">{product.adjectives}</span>
	<span class="detail">{product.materials}</span>
	<a
		href="#header"
		id="product-details-close"
		class="product-details-toggle"
		on:click|preventDefault="{() => {
			closeDialog();
		}}"
	>
		<span id="product-details-close-text">Close</span>
		<span class="sr-only">Close product details</span>
	</a>
</div>
<a
	href="#header"
	id="product-details-backdrop"
	tabindex="-1"
	aria-hidden="true"
	hidden
	on:click|preventDefault="{() => {
		closeDialog();
	}}"
>
	<span></span>
</a>

<style>
	#product-details {
		width: 100%;
		max-width: 625px;
		height: 65%;
		padding: 5em 0 0 0;
		border-radius: 25px 25px 0 0;
		background: var(--primary-light);
		visibility: hidden;
		overflow-y: scroll;
		display: grid;
		grid-template-columns: 1fr;
		grid-auto-rows: auto;
		position: absolute;
		bottom: -100%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
	}

	.detail {
		margin: 1em 0;
	}

	#product-details > span:last-of-type {
		margin: 1em 0 2em;
	}

	#product-details-close {
		position: absolute;
		right: 7%;
		top: 6%;
		text-decoration: none;
	}

	#product-details-close-text {
		text-align: center;
		vertical-align: text-bottom;
		font-weight: 300;
		box-shadow: 0px 1px 0px 0px var(--black);
	}

	/*
		On small devices, allow it to toggle...
	*/
	/*
		:target for non-JavaScript
		[aria-expanded] will be used if/when JavaScript is added to improve interaction, though it's completely optional.
	*/
	#product-details:target,
	#product-details[aria-expanded="true"] {
		visibility: visible;
		bottom: 0;
		outline: none;
	}

	#product-details:target > #product-details-close,
	#product-details[aria-expanded="true"] > #product-details-close {
		z-index: 1001;
	}

	/*
		We could us `.main-menu:target:after`, but
		it wouldn't be clickable.
	*/
	#product-details:target ~ #product-details-backdrop,
	#product-details[aria-expanded="true"] ~ #product-details-backdrop {
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 998;
		background: var(--black);
		cursor: default;
		opacity: 0.5;
	}

	@supports (position: fixed) {
		#product-details,
		#product-details:target ~ #product-details-backdrop,
		#product-details[aria-expanded="true"] ~ #product-details-backdrop {
			position: fixed;
		}
	}
</style>

<script>
	/**
	 * Component shown when ProductCard component in home page grid is pressed
	 */

	import {
		detailedProductVisibility,
		currDetailedProduct,
	} from "../utils/stores";
	import { closeDialog } from "../utils/classes/dialog";

	/**
	 * $currDetailedProduct = {{
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
</script>

<article
	id="product-detailed"
	class="dialog"
	aria-label="Product details"
	aria-expanded="{$detailedProductVisibility ? 'true' : 'false'}"
>
	<div class="product-details dialog-content">
		<span class="detail">{$currDetailedProduct.name}</span>
		<span class="detail">{$currDetailedProduct.id}</span>
		<span class="detail">${$currDetailedProduct.price}</span>
		<span class="detail">{$currDetailedProduct.department}</span>
		<span class="detail">{$currDetailedProduct.description}</span>
		<span class="detail">{$currDetailedProduct.adjectives}</span>
		<span class="detail">{$currDetailedProduct.materials}</span>
	</div>
	<a
		href="#header"
		class="product-details-toggle dialog-toggle"
		on:click|preventDefault="{() => {
			closeDialog();
		}}"
	>
		<span class="underlined">Close</span>
		<span class="sr-only">Close product details</span>
	</a>
</article>
<a
	class="backdrop"
	href="#header"
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
	#product-detailed {
		height: 65%;
		padding-top: 3em;
		padding-bottom: 1em;
		padding-left: 16px;
		padding-right: 16px;
		border-radius: 25px 25px 0 0;
		background: var(--color-primary-light);
		left: 0;
		bottom: 0;
	}

	.product-details {
		display: grid;
		grid-template-columns: 1fr;
	}

	.detail {
		margin-top: 1em;
		margin-bottom: 1em;
	}

	.product-details > span:last-of-type {
		margin-top: 1em;
		margin-bottom: 2em;
	}

	.product-details-toggle {
		position: absolute;
		right: 7%;
		top: 6%;
	}
</style>

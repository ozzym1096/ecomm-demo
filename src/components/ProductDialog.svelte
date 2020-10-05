<script>
	/**
	 * Component shown when ProductCard component in home page grid is pressed
	 */

	import {
		detailedProductVisibility,
		currDetailedProduct,
	} from "../utils/stores";
	import { closeDialog } from "../utils/classes/dialog";
</script>

<article
	id="product-detailed"
	class="dialog"
	aria-label="Information about {$currDetailedProduct.name}"
	aria-expanded="{$detailedProductVisibility ? 'true' : 'false'}"
>
	<div class="l-wrapper">
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
			href="#products"
			class="product-detailed-toggle dialog-toggle"
			on:click|preventDefault="{() => {
				closeDialog();
			}}"
		>
			<span>Close</span>
			<span class="sr-only">Close product details</span>
		</a>
	</div>
</article>
<a
	class="backdrop"
	href="#products"
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
		width: 100%;
		padding-top: 3em;
		padding-bottom: 1em;
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

	.product-details > .detail:last-of-type {
		margin-top: 1em;
		margin-bottom: 2em;
	}

	.product-detailed-toggle {
		position: absolute;
		right: 7%;
		top: 6%;
	}
</style>

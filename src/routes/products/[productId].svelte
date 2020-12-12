<script context="module">
	export async function preload(page) {
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();
		return { product: data };
	}
</script>

<script>
	export let product;

	import { image } from "svelte-cloudinary";
</script>

<h2>{product.name}</h2>
<img
	use:image="{{ src: `\/ecomm-demo\/${product.image}`, bind: true, lazy: true, options: { crop: 'lfill', gravity: 'auto' } }}"
	alt="{`Product photo of ${product.name}`}"
/>

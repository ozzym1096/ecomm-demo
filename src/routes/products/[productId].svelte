<script context="module">
	export async function preload(page, session) {
		const { CLOUDINARY_NAME } = session;
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();
		return { product: data, clName: CLOUDINARY_NAME };
	}
</script>

<script>
	export let product;
	export let clName;

	import { initialize, image } from "svelte-cloudinary";

	initialize({ cloud_name: clName });
</script>

<h2>{product.name}</h2>
<img
	use:image="{{ src: `\/ecomm-demo\/${product.image}`, bind: true, lazy: true, options: { crop: 'lfill', gravity: 'auto' } }}"
	alt="{`Product photo of ${product.name}`}"
/>
l

<style>
	img {
		width: 65vw;
	}
</style>

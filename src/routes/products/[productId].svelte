<script context="module">
	export async function preload(page) {
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();
		return { product: data };
	}
</script>

<script>
	export let product;

	import { Cloudinary } from "cloudinary-core";

	const cl = new Cloudinary({ cloud_name: "dmi84pjlo", secure: true });
</script>

<h2>{product.name}</h2>
<img src="{`ecomm-demo\/${product.image}.jpg`}" alt="" />

<script context="module">
	export async function preload(page) {
		const res = await this.fetch(`products/${page.params.productId}.json`);
		const data = await res.json();
		return { product: data };
	}
</script>

<script>
	export let product;
</script>

<h2>{product.name}</h2>
<img src="{product.image}" alt="" />

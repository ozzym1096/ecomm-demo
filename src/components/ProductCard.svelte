<script>
	export let product;

	// import { image } from "svelte-cloudinary";
</script>

<li class="pt-8">
	<div class="space-y-5 flex flex-col items-center">
		<div class="w-64 aspect-w-6 aspect-h-4">
			<!-- <img
				use:image="{{
					src: `\/ecomm-demo\/products\/${product.imageName}`,
					bind: true,
					step: 100,
					options: { crop: 'fit' },
				}}"
				class="inline-block"
				alt="{product.name}" /> -->
			<img
				class="object-cover"
				src="{`images/products/no-bg/${product.imageName}.png`}"
				alt="{product.name}" />
		</div>
		<div class="flex flex-col justify-center">
			<a href="/products/{product.id}"><h2>{product.name}</h2></a>
			<p>${product.priceUsd}</p>
		</div>
	</div>
</li>

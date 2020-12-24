<script>
	import { stores } from "@sapper/app";

	const { page } = stores();
</script>

<ul class="nav-list">
	<li class="nav-list-item l-display-contents">
		<a
			class="nav-list-item-content"
			href="/products"
			aria-current="{$page.path === '/products' ? 'page' : undefined}"
		>
			<span>products</span>
		</a>
	</li>
	<li class="nav-list-item l-display-contents">
		<a
			class="nav-list-item-content"
			href="/about"
			aria-current="{$page.path === '/about' ? 'page' : undefined}"
		>
			<span>about</span>
		</a>
	</li>
	<li class="nav-list-item l-display-contents">
		<a
			class="nav-list-item-content"
			href="/contact"
			aria-current="{$page.path === '/contact' ? 'page' : undefined}"
		>
			<span>contact</span>
		</a>
	</li>
	<li class="nav-list-item l-display-contents">
		<div class="nav-list-item-content">
			<svg
				class="svg-cart"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 576 512"
			>
				<path
					d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64
					551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0
					126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24
					24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0
					30.928 25.072 56 56 56s56-25.072
					56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447
					426.165 424 440.326 424 456c0 30.928 25.072 56 56
					56s56-25.072
					56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206
					0 20.92-7.754 23.403-18.681z"
				></path>
			</svg>
		</div>
	</li>
</ul>

<style>
	[aria-current] > span {
		color: var(--color-blue-dark);
		font-weight: var(--font-weight-boldest);
	}

	.nav-list {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-column-gap: 2%;
		justify-content: center;
		align-items: center;
	}

	.nav-list-item-content {
		color: var(--color-orange-dark);
		font-size: var(--font-size-small);
		font-weight: var(--font-weight-bolder);
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 25%;
		padding-bottom: 25%;
	}

	.svg-cart {
		width: 2vw;
		min-width: 25px;
		fill: var(--color-orange-dark);
	}

	@media (orientation: landscape) and (max-height: 500px) {
		.nav-list {
			height: 100%;
			grid-template-columns: initial;
			grid-template-rows: repeat(4, 1fr);
			grid-column-gap: initial;
			grid-row-gap: initial;
		}

		.nav-list-item {
			padding-top: 28%;
			padding-bottom: 28%;
		}
	}
</style>

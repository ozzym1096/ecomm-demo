<script>
	import { stores } from "@sapper/app";

	const { page } = stores();
</script>

<ul class="nav-list">
	<li class="nav-list-item">
		<a
			class="font-base"
			href="/products"
			aria-current="{$page.path === '/products' ? 'page' : undefined}"
		>
			<span>products</span>
		</a>
	</li>
	<li class="nav-list-item">
		<a
			class="font-base"
			href="/about-us"
			aria-current="{$page.path === '/about-us' ? 'page' : undefined}"
		>
			<span>about us</span>
		</a>
	</li>
	<li class="nav-list-item">
		<a
			class="font-base"
			href="/contact-us"
			aria-current="{$page.path === '/contact-us' ? 'page' : undefined}"
		>
			<span>contact us</span>
		</a>
	</li>
</ul>

<style>
	.nav-list {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		overflow-x: auto;
		white-space: nowrap;
		margin-top: 0;
		margin-bottom: 0;
	}

	.nav-list-item {
		display: inline-block;
		padding-left: 1em;
		padding-right: 1em;
		padding-top: 0.7em;
		padding-bottom: 0.7em;
		margin-left: 0.5em;
		margin-right: 0.5em;
	}

	@keyframes navListScroll {
		0% {
			margin-left: 0.5em;
		}
		50% {
			margin-left: -30px;
		}
		100% {
			margin-left: 0.5em;
		}
	}

	.nav-list-item > a {
		text-decoration: underline;
	}

	@media (orientation: landscape) {
		.nav-list {
			justify-content: center;
		}
	}

	@media (orientation: portrait) {
		.nav-list-item:first-of-type {
			animation: 1s ease-out 0.5s navListScroll;
		}
	}
</style>

<script>
	import MainNavList from "../components/MainNavList.svelte";
</script>

<header id="main-header" class="l-wrapper">
	<div class="l-display-contents">
		<a class="main-header-logo font-large" href="/">Craaaiiig's</a>
		<svg
			class="main-header-cart"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 576 512"
		>
			<path
				d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99
				64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529
				0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24
				24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0
				30.928 25.072 56 56 56s56-25.072
				56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165
				424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072
				56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206
				0 20.92-7.754 23.403-18.681z"
			></path>
		</svg>
		<nav class="main-header-nav font-base" aria-label="Website categories">
			<MainNavList />
		</nav>
	</div>
</header>
<main>
	<slot />
</main>

<style>
	#main-header {
		margin-bottom: 30px;
		display: grid;
		grid-template-columns: repeat(2, 50%);
		grid-template-areas:
			"logo cart"
			"nav nav";
		align-items: center;
		background-color: var(--color-white);
	}

	.main-header-logo {
		font-weight: 600;
		color: var(--color-primary);
		grid-area: logo;
		justify-self: start;
	}

	.main-header-cart {
		width: 2vw;
		min-width: 25px;
		fill: var(--color-primary);
		grid-area: cart;
		justify-self: end;
	}

	.main-header-nav {
		background-color: var(--color-primary-light);
		grid-area: nav;
		overflow: hidden;
	}
</style>

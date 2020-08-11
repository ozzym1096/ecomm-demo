<script>
	import MainMenu from "../components/MainMenu";
	import { mainMenuVisibility } from "../utils/stores";
	import { openDialog } from "../utils/classes/dialog";

	let mainMenuNode;
</script>

<header id="site-header" class="l-wrapper">
	<div class="l-display-contents">
		<a
			class="menu-toggle font-small"
			href="#main-nav"
			on:click|preventDefault="{(e) => {
				openDialog(mainMenuVisibility, mainMenuNode, e.target, mainMenuNode.querySelector('a'));
			}}"
			aria-haspopup="menu"
		>
			<span class="underlined" aria-hidden="true">Menu</span>
			<span class="sr-only">Open main menu</span>
		</a>
		<a class="site-header-logo font-large" href=".">Craaaiiig's</a>
		<MainMenu bind:mainMenuNode />
		<svg
			class="site-header-cart"
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
	</div>
</header>
<main>
	<slot />
</main>

<style>
	/* Layouts */

	#site-header {
		margin-bottom: 30px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: var(--color-primary-light);
	}

	/* Modules */

	/* Submodules */

	.site-header-logo {
		font-weight: 600;
		color: var(--color-primary);
	}

	.site-header-cart {
		width: 2vw;
		min-width: 25px;
		fill: var(--color-primary-dark);
	}
</style>

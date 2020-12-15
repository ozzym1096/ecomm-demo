<script>
	import { onMount } from "svelte";
	import MainNavList from "../components/MainNavList.svelte";

	let headerHeight;

	onMount(() => {
		headerHeight = document.getElementById("nav-main").clientHeight;
	});
</script>

<header id="main-header" class="l-wrapper">
	<div class="l-display-contents">
		<a class="main-header-logo" href="/">Craaaiiig's</a>
	</div>
</header>
<nav id="nav-main" class="l-wrapper" aria-label="Website categories">
	<MainNavList />
</nav>
<main style="{`margin-bottom: ${headerHeight + 30}px;`}">
	<slot />
</main>

<style>
	#main-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 8%;
		margin-bottom: 8%;
	}

	.main-header-logo {
		font-size: var(--font-size-large);
		font-family: "Rock Salt", cursive;
		font-weight: var(--font-weight-bolder);
		color: var(--color-orange);
	}

	#nav-main {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
		background-color: var(--color-orange-dark);
		box-shadow: 0px -1px 7px 0px #5e5e5e;
	}
</style>

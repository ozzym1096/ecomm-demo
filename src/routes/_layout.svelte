<script>
	import MainNavList from "../components/MainNavList.svelte";
</script>

<header id="main-header" class="l-wrapper">
	<div class="l-display-contents">
		<a class="main-header-logo" href="/">Craaaiiig's</a>
	</div>
</header>
<nav id="nav-main" class="l-wrapper" aria-label="Website categories">
	<MainNavList />
</nav>
<main>
	<slot />
</main>

<style>
	#main-header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 9%;
		margin-bottom: 9%;
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
		background-color: var(--color-orange-light);
		box-shadow: 0px 7px 11px 0px #5e5e5e;
	}

	main {
		margin-bottom: 25%;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		#main-header,
		main {
			width: 85%;
			margin-left: initial;
		}

		#main-header {
			margin-top: 5%;
			margin-bottom: 5%;
		}

		#nav-main {
			width: 15%;
			height: 100%;
			bottom: initial;
			left: initial;
			top: 0;
			box-shadow: 7px 0px 11px 0px #5e5e5e;
		}

		main {
			margin-bottom: 0;
		}
	}
</style>

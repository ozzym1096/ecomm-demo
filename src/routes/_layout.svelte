<script context="module">
	export async function preload(page, session) {
		const { CLOUDINARY_NAME: cloud_name } = session;
		return { cloud_name };
	}
</script>

<script>
	export let cloud_name;

	import MainNavList from "../components/MainNavList.svelte";
	import { initialize } from "svelte-cloudinary";

	initialize({
		cloud_name,
	});
</script>

<header id="main-header" class="l-wrapper">
	<div class="l-display-contents">
		<a class="main-header-logo" href="/">Craaaiiig's</a>
		<nav id="nav-main" aria-label="Website categories">
			<MainNavList />
		</nav>
	</div>
</header>
<main>
	<div class="l-wrapper">
		<slot />
	</div>
</main>

<style>
	#main-header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 5vh;
		margin-bottom: 5vh;
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
		margin-bottom: 12vh;
	}

	@media (orientation: landscape) and (max-height: 500px) {
		#main-header,
		main {
			width: 85%;
		}

		#main-header {
			margin-left: initial;
			margin-top: 9vh;
			margin-bottom: 7vh;
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
			margin-bottom: 3vh;
		}
	}

	@media (min-width: 671px) and (min-height: 501px) {
		header,
		main {
			--padding: 5vw;
		}

		#main-header {
			justify-content: space-between;
			margin-top: 4vh;
			margin-bottom: 3vh;
		}

		#nav-main {
			display: contents;
			box-shadow: initial;
			background-color: initial;
		}

		main {
			margin-bottom: 5vh;
		}
	}
</style>

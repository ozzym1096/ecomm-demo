<script>
	/**
	 * Main menu link with possible submenu
	 */

	import MainMenuItem from "./MainMenuItem.svelte";
	import { mainMenuPages, mainMenuVisibility } from "../utils/stores";
	import { closeDialog } from "../utils/classes/dialog";

	export let mainMenuNode = undefined;
</script>

<nav
	class="main-menu dialog font-base"
	id="main-menu"
	bind:this="{mainMenuNode}"
	aria-label="Main Menu"
	aria-expanded="{$mainMenuVisibility ? 'true' : 'false'}"
>
	<ul class="dialog-content menu-list">
		{#each mainMenuPages as menuPageInfo}
			<MainMenuItem {menuPageInfo} />
		{/each}
	</ul>
	<a
		class="dialog-toggle font-small"
		href="#site-header"
		on:click|preventDefault="{() => {
			closeDialog();
		}}"
	>
		<span class="underlined" aria-hidden="true">Close</span>
		<span class="sr-only">Close main menu</span>
	</a>
</nav>
<a
	class="backdrop"
	href="#site-header"
	tabindex="-1"
	aria-hidden="true"
	hidden
	on:click|preventDefault="{() => {
		closeDialog();
	}}"
>
	<span></span>
</a>

<style>
	.main-menu {
		left: -100%;
		top: 0;
		min-height: 100vh;
		background-color: var(--color-primary-light);
	}

	.main-menu:target,
	.main-menu[aria-expanded="true"] {
		left: 0;
	}

	.main-menu > ul {
		padding-top: 45px;
		width: 245px;
	}

	.main-menu > .dialog-toggle {
		position: absolute;
		right: 10%;
		top: 6%;
	}
</style>

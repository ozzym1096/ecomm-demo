<script>
	import NavListItem from '../components/NavListItem';
	import {NavSublinks, mainMenuVisibility} from '../utils/stores'
	import {openDialog, closeDialog} from '../utils/classes/dialog';
	import {handleEscape} from '../utils/aria';

	export let segment;

	let mainMenu;

	function handleEscapeFn(e) {
		handleEscape(e, mainMenuVisibility);
	};

	async function showMainMenu(e) {
		e.preventDefault();
		$mainMenuVisibility = true;
		mainMenu.addEventListener('transitionend', function afterMenuOpens() {
			openDialog(mainMenu, e.target, document.querySelector('#main-menu a'));
			document.addEventListener('keyup', handleEscapeFn);
			this.removeEventListener('transitionend', afterMenuOpens)
		});
		return false;
	};

	function hideMainMenu(e) {
		e.preventDefault();
		$mainMenuVisibility = false;
		closeDialog(e.target);
		document.removeEventListener('keyup', handleEscapeFn);
		return false;
	};
	
</script>

<style>
	header {
		margin: 3em auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: var(--page-width);
		align-items: center;
	}

	#main-menu-toggle {
		justify-self: flex-start;
	}

	#header-logo {
		font-family: 'Comfortaa', cursive;
		font-size: 1em;
		text-decoration: none;
		line-height: 1.3em;
		justify-self: center;
	}

	#header-cart {
		width: 2vw;
		min-width: 25px;
		fill: var(--primary-color);
		justify-self: flex-end;
	}

	#main-menu-toggle:hover,
	#main-menu-toggle:focus {
		color: var(--black);
	}

	#main-menu {
		position: absolute;
		visibility: hidden;
		left: -200px;
		top: 0;
		height: 100%;
		overflow-y: scroll;
		overflow-x: visible;
		transition: left 0.5s ease-in,
			visibility 0s linear,
			opacity 0s linear;
		z-index: 999;
		background: var(--primary-light);
	}

	#main-menu > ul {
		list-style: none;
		margin: 0;
		padding: 2.5em 0 0;
		min-height: 100%;
		width: 225px;
	}

	#main-menu-close {
		position: absolute;
		right: 7%;
		top: 4%;
	}

	.menu-toggle {
		text-decoration: none;
	}

	.menu-toggle-text {
		text-align: center;
		vertical-align: text-bottom;
		font-weight: 300;
		box-shadow: 0px 1px 0px 0px var(--black);
	}

	/*
		On small devices, allow it to toggle...
	*/
	/*
		:target for non-JavaScript
		[aria-expanded] will be used if/when JavaScript is added to improve interaction, though it's completely optional.
	*/
	#main-menu:target,
	#main-menu[aria-expanded="true"] {
		visibility: visible;
		left: 0;
		outline: none;
		transition: left 0.5s ease-in,
			visibility 0.6s linear,
			opacity 0.5s linear;
	}

	#main-menu:target > #main-menu-close,
	#main-menu[aria-expanded="true"] > #main-menu-close {
		z-index: 1001;
	}

	#main-menu:target > ul,
	#main-menu[aria-expanded="true"] > ul {
		position: relative;
		z-index: 1000;
	}

	/* 
		We could us `.main-menu:target:after`, but
		it wouldn't be clickable.
	*/
	#main-menu:target ~ #main-menu-backdrop,
	#main-menu[aria-expanded="true"] ~ #main-menu-backdrop{
		position: absolute;
		display: block;  
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 998;
		background: var(--black);
		cursor: default;
	}

	@supports (position: fixed) {
		#main-menu,
		#main-menu:target ~ #main-menu-backdrop,
		#main-menu[aria-expanded="true"] ~ #main-menu-backdrop{
			position: fixed;
		}
	}

	main {
		position: relative;
		background-color: white;
		padding: 0;
		margin: 0 auto;
		box-sizing: border-box;
		width: var(--page-width);
		max-width: var(--page-max-width);
	}
</style>

<header>
	<a 	href="#main-menu"
		id="main-menu-toggle"
		class="menu-toggle"
		aria-label="Open main menu"
		on:click={showMainMenu}>
		<span class="menu-toggle-text">Menu</span>
		<span class="sr-only">Open main menu</span>
	</a>
	<a	id="header-logo"
		href=".">
		Craaaiiig's
	</a>
	<svg id="header-cart" class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
	<nav bind:this={mainMenu} id="main-menu" aria-label="Main Menu" aria-expanded={$mainMenuVisibility ? "true" : "false"}>
		<ul>
			<NavListItem ariaCurrent={segment === undefined} href="." catName="home">
			</NavListItem>
			<NavListItem ariaCurrent={segment === "category1-pages"} href="category1-pages" sublinks={NavSublinks.cat1} catName="category 1">
			</NavListItem>
			<NavListItem ariaCurrent={segment === "category2-pages"} href="category2-pages" sublinks={NavSublinks.cat2} catName="category 2">
			</NavListItem>
			<NavListItem ariaCurrent={segment === "category3-pages"} href="category3-pages" sublinks={NavSublinks.cat3} catName="category 3">
			</NavListItem>
		</ul>
		<a	href="#main-menu-toggle"
			id="main-menu-close"
			class="menu-toggle"
			aria-label="Close main menu"
			on:click={hideMainMenu}>
			<span class="menu-toggle-text">Close</span>
			<span class="sr-only">Close main menu</span>
		</a>
	</nav>
	<a	href="#main-menu-toggle"
		id="main-menu-backdrop"
		tabindex="-1"
		aria-hidden="true"
		hidden
		on:click={hideMainMenu}>
	</a>
</header>

<main>
	<slot></slot>
</main>

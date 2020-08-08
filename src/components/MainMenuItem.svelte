<script>
	/**
	 * Main menu link with possible submenu
	 */

	import { onMount } from "svelte";
	import { stores } from "@sapper/app";
	import { closeDialog } from "../utils/classes/dialog";
	import { toUrlSegment } from "../utils";

	export let menuPageInfo;

	const { page } = stores();

	let subVisibility = false,
		hasSubpages = menuPageInfo.hasOwnProperty("subpages"),
		sublinkTimer,
		mainMenuItem;

	onMount(() => {
		if (hasSubpages) {
			for (let link of mainMenuItem.querySelectorAll("a")) {
				link.addEventListener("focus", () => {
					if (sublinkTimer) {
						clearTimeout(sublinkTimer);
						sublinkTimer = null;
					}
				});
				link.addEventListener("blur", () => {
					sublinkTimer = setTimeout(() => {
						subVisibility = false;
					}, 10);
				});
			}
		}
	});
</script>

{#if hasSubpages}
	<li class="main-menu-item" bind:this="{mainMenuItem}">
		<a
			class="submenutoggle menu-link font-base"
			on:click|preventDefault="{() => {
				subVisibility = !subVisibility;
			}}"
			href="{toUrlSegment(menuPageInfo.title)}"
			aria-haspopup="true"
			aria-expanded="{subVisibility}"
		>
			<span>{menuPageInfo.title}</span>
			<svg
				class="submenutoggle-arrow {subVisibility ? 'upward' : ''}"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		</a>
		<ul
			class="submenu {subVisibility ? 'submenu-is-visible' : ''}"
			aria-label="Submenu for {menuPageInfo.title}"
		>
			{#each menuPageInfo.subpages as subpage}
				<li class="submenuitem">
					<a
						class="submenuitem-link menu-link font-base"
						href="{toUrlSegment(menuPageInfo.title) + '/' + toUrlSegment(subpage)}"
						aria-current="{$page.path === '/' + toUrlSegment(menuPageInfo.title) + '/' + toUrlSegment(subpage) ? 'page' : undefined}"
						on:click="{() => {
							closeDialog();
						}}"
					>
						<span>{subpage}</span>
					</a>
				</li>
			{/each}
		</ul>
	</li>
{:else}
	<li class="main-menu-item">
		<a
			class="menu-link font-base"
			href="{menuPageInfo.title === 'home' ? '.' : toUrlSegment(menuPageInfo.title)}"
			aria-current="{menuPageInfo.title === 'home' && $page.path === '/' ? 'page' : $page.path === toUrlSegment(menuPageInfo.title) ? 'page' : undefined}"
			on:click="{() => {
				closeDialog();
			}}"
		>
			<span>{menuPageInfo.title}</span>
		</a>
	</li>
{/if}

<style>
	.submenutoggle-arrow {
		transform-origin: 50% 50%;
		transition: transform ease-out 0.2s;
		margin-left: 0.5em;
	}

	.submenutoggle-arrow.upward {
		transform: rotate(-180deg);
	}

	.submenu {
		visibility: hidden;
		position: absolute;
		background: var(--color-secondary-light);
		width: 100%;
		padding: 0;
		left: 0;
		z-index: 99999;
	}

	.submenu-is-visible {
		visibility: visible;
	}

	.submenuitem-link {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

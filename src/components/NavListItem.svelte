<script>
	/**
	 * Main menu link with possible submenu
	 */

	import { onMount } from "svelte";
	export let ariaCurrent;
	export let href;
	export let sublinks = undefined;
	export let mainLinkTitle;

	let hasSub = sublinks !== undefined,
		subVisibility = false,
		sublinkTimer,
		container,
		subToggle;

	onMount(() => {
		if (hasSub) {
			for (let link of container.querySelectorAll("a")) {
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
			subToggle.addEventListener("click", (e) => {
				e.preventDefault();
				subVisibility = !subVisibility;
			});
		}
	});
</script>

<li class="container" bind:this="{container}">
	{#if hasSub}
		<a
			class="mainLink"
			bind:this="{subToggle}"
			{href}
			aria-current="{ariaCurrent ? 'page' : undefined}"
			aria-haspopup="true"
			aria-expanded="{subVisibility}"
		>
			<span>{mainLinkTitle}</span>
			<svg
				class="mainLink-svg {subVisibility ? 'upward' : ''}"
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
		<ul class="submenu {subVisibility ? 'subVisible' : ''}">
			{#each sublinks as link}
				<li class="sublink">
					<a class="sublink-link" href="{link[1]}">{link[0]}</a>
				</li>
			{/each}
		</ul>
	{:else}
		<a
			class="mainLink"
			{href}
			aria-current="{ariaCurrent ? 'page' : undefined}"
		>
			<span>{mainLinkTitle}</span>
		</a>
	{/if}
</li>

<style>
	li {
		display: block;
	}

	a {
		display: block;
		margin: 1em;
		text-decoration: none;
	}

	.container {
		position: relative;
	}

	.mainLink {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}

	.mainLink-svg {
		transform-origin: 50% 50%;
		transition: transform ease-out 0.2s;
		margin: 0 0 0 0.5em;
	}

	.mainLink-svg.upward {
		transform: rotate(-180deg);
	}

	.submenu {
		display: none;
		position: absolute;
		background: var(--secondary-light);
		width: 100%;
		padding: 0;
		left: 0;
		z-index: 99999;
	}

	.sublink-link {
		font-weight: 400;
		min-width: 50px;
		min-height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Different States */

	.subVisible {
		display: flex;
		flex-flow: column nowrap;
	}

	[aria-current] > span {
		position: relative;
		display: inline-block;
	}

	[aria-current] > span::after {
		position: absolute;
		content: "";
		width: 100%;
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}
</style>

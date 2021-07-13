<script context="module">
	import { stores } from "@sapper/app";
</script>

<script>
	export let href;

	const { page } = stores();
</script>

<li>
	<a
		class="relative"
		href="{href}"
		aria-current="{$page.path === href ? 'page' : undefined}">
		<div
			class="nav-link relative flex flex-col justify-center items-center"
			style="min-height: 44px; min-width: 44px;">
			<slot />
		</div>
	</a>
</li>

<style>
	@layer utilities {
		[aria-current] {
			@apply text-blue-900;
		}

		[aria-current] > .nav-link::before {
			content: "\25BC";
			@apply text-xs absolute left-1/2 transform -translate-x-1/2 -top-0.5;
		}
	}
</style>

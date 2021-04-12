<script context="module">
	import { stores } from "@sapper/app";
</script>

<script>
	export let href;

	const { page } = stores();
</script>

<li>
	<a
		class="font-bold"
		href="{href}"
		aria-current="{$page.path === href ? 'page' : undefined}"
	>
		<div
			class="nav-link min-w-min w-12 h-12 flex flex-col justify-center items-center"
		>
			<slot />
		</div>
	</a>
</li>

<style global lang="postcss">
	@layer base {
		[aria-current] > .nav-link {
			@apply text-blue-800;
		}

		[aria-current] > .nav-link::before {
			content: "\25BC";
			@apply text-xs;
		}
	}
</style>

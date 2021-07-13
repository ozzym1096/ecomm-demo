<script>
	import MainNavLink from "./MainNavLink.svelte";
</script>

<header
	class="px-7 pt-9 pb-7 flex justify-center items-center sm:bg-gray-50 sm:justify-between sm:px-12 sm:py-5 sm:shadow sm:relative sm:z-10 md:px-16 md:py-8 lg:px-20">
	<a class="text-3xl font-bold text-red-500" href="/">Craaaiiig's</a>
	<nav
		class="bg-white fixed z-10 bottom-0 left-0 right-0 px-14 py-3 shadow-sm sm:static sm:shadow-none sm:px-0 sm:py-0"
		aria-label="Main website pages">
		<ul
			class="flex justify-between items-center sm:items-end sm:space-x-12">
			<MainNavLink href="/products">products</MainNavLink>
			<MainNavLink href="/cart">
				<svg
					class="fill-current w-6"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 576 512">
					<path
						d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
					></path>
				</svg>
			</MainNavLink>
		</ul>
	</nav>
</header>

<style global>
	@layer base {
		a {
			@apply underline;
		}
	}

	@layer components {
		.card-list {
			@apply grid gap-y-8 gap-x-5 divide-y-2 divide-current sm:grid-cols-2;
		}
	}

	@layer utilities {
	}
</style>

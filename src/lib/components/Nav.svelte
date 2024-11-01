<script>
	import { TEXT } from '$lib/config';
</script>

<nav>
	<ul>
		<li><a href="/">{TEXT.HOME}</a></li>
		<li><a href="/create">{TEXT.CREATE_SVORM}</a></li>
		<li><a href="/answer">{TEXT.ANSWER_SVORM}</a></li>
		<li><a href="/results">{TEXT.RESULTS_SVORM}</a></li>
	</ul>
</nav>

<style lang="scss">
	nav {
		padding: 0.75rem;
		background-color: var(--primary-color);
		color: white;
		font-size: 1rem;
	}
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		column-gap: 1.2rem;
		row-gap: 0.4rem;
	}
	a {
		text-underline-offset: 0.15em;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { HEADINGS, TEXT } from '$lib/config';
	const id = $page.params.id;
	const origin_url = $page.url.origin;
	const answer_url = `${origin_url}/answer/${id}`;
	const results_url = `${origin_url}/results/${id}`;
</script>

<h2>{HEADINGS.CREATED}</h2>

<p>{TEXT.LINK}</p>

<ul>
	<li>
		<a href={answer_url}>{answer_url}</a>
	</li>
	<li>
		<a href={results_url}>{results_url}</a>
	</li>
</ul>

<style>
	ul {
		padding-left: 1rem;
		margin-top: 1rem;
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import { TEXT } from '$lib/config';
	const id = $page.params.id;
	const origin_url = $page.url.origin;
	const results_url = `${origin_url}/results/${id}`;
</script>

<h2>Submission successful</h2>

<p>Thank you!</p>

<br />

<p>{TEXT.SEE_RESULTS}</p>

<a href={results_url}>{results_url}</a>

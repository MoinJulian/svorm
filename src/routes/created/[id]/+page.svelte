<script lang="ts">
	import { page } from '$app/stores';
	const id = $page.params.id;
	const origin_url = $page.url.origin;
	const answer_url = `${origin_url}/answer/${id}`;
</script>

<h2>Svorm has been created</h2>

<p>You can answer the svorm via the following link:</p>

<p>
	<a href={answer_url}>{answer_url}</a>
</p>

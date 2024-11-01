<script lang="ts">
	import { goto } from '$app/navigation';
	import { HEADINGS, LABELS } from '$lib/config';

	let id: number;

	function submitId() {
		goto(`/results/${id}`);
	}
</script>

<h2>{HEADINGS.RESULTS}</h2>

<form on:submit|preventDefault={submitId}>
	<label>
		{LABELS.SVORM_ID}
		<input type="number" bind:value={id} />
	</label>
	<menu class="small-menu">
		<button type="submit">{LABELS.SUBMIT_ID}</button>
	</menu>
</form>

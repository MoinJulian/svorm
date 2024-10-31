<script lang="ts">
	import { goto } from '$app/navigation';

	let id: number;

	function submitId() {
		goto(`/answer/${id}`);
	}
</script>

<h2>Answer a svorm</h2>

<form on:submit|preventDefault={submitId}>
	<label>
		SvormID
		<input type="number" bind:value={id} />
	</label>
	<menu class="small-menu">
		<button type="submit">Submit ID</button>
	</menu>
</form>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Asterisk from '$lib/components/Asterisk.svelte';
	import Error from '$lib/components/Error.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Required from '$lib/components/Required.svelte';
	import { ERROR } from '$lib/config';

	let id: number;
	let loading = false;
	let error_message = '';

	function submitId() {
		if (!id) {
			error_message = ERROR.NO_ID;
			return;
		}

		loading = true;
		goto(`/answer/${id}`);
	}
</script>

<h2>Answer a svorm</h2>

<Required noun="Fields" />

<form on:submit|preventDefault={submitId}>
	<label>
		SvormID<Asterisk />
		<input type="number" bind:value={id} />
	</label>
	<menu class="small-menu">
		<button type="submit">Submit ID</button>
	</menu>
</form>

<Loader {loading} />
<Error {error_message} />

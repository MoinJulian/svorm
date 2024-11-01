<script lang="ts">
	import { scroll_to_bottom } from '$lib/utils';
	import { tick } from 'svelte';

	export let error_message = '';

	$: if (error_message) {
		tick().then(scroll_to_bottom);
	}
</script>

<p aria-live="assertive" class:show={error_message}>
	{error_message}
</p>

<style>
	.show {
		color: var(--danger-color);
		font-weight: bold;
		padding-block: 1rem;
	}
</style>

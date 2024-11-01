<script lang="ts">
	import { TEXT } from '$lib/config';

	export let noun: string = '';
</script>

<p aria-hidden="true">
	{@html noun + TEXT.REQUIRED_INFO}
</p>

<style>
	p {
		font-size: smaller;
		margin-bottom: 0.5rem;
	}
</style>

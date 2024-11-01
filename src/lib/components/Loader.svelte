<script lang="ts">
	import { scroll_to_bottom } from '$lib/utils';
	import { tick } from 'svelte';

	export let loading = false;
	$: if (loading) {
		tick().then(scroll_to_bottom);
	}
</script>

{#if loading}
	<div class="loader">
		<div class="ring">
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div />
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div />
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div />
			<!-- svelte-ignore element_invalid_self_closing_tag -->
			<div />
		</div>
	</div>
{/if}

<style>
	.loader {
		display: flex;
		justify-content: center;
	}
	.ring {
		position: relative;
		width: 2.5rem;
		height: 2.5rem;
	}
	.ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		border: 0.35rem solid;
		border-radius: 50%;
		animation: rotate 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #bbb transparent transparent transparent;
	}
	.ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

<script>
	import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let show = true;
</script>

{#if show}
	<span class="asterisk danger" aria-hidden="true">
		<Fa icon={faAsterisk} scale="0.5" />
	</span>
	<span class="visually-hidden"> required </span>
{/if}

<style>
	.asterisk {
		display: inline-block;
		transform: translateY(-0.2em);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		left: -100000px;
	}
</style>

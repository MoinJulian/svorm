<script lang="ts">
	import { LABELS } from '$lib/config';
	import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let choices: string[] = [];
	let next_choice: string = '';

	function addChoice(): void {
		choices = [...choices, next_choice];
		next_choice = '';
	}

	function deleteChoice(index: number): void {
		choices.splice(index, 1);
		choices = choices;
	}
</script>

{#if choices.length > 0}
	<h4>Choices</h4>
	<ol>
		{#each choices as choice, index}
			<li>
				{choice}
				<button
					aria-label="Delete {choice}"
					class="small danger"
					on:click={() => deleteChoice(index)}><Fa icon={faTrash}></Fa></button
				>
			</li>
		{/each}
	</ol>
{:else}
	<p>Please add a choice</p>
{/if}

<form on:submit|preventDefault={addChoice}>
	<input type="text" bind:value={next_choice} aria-label={LABELS.CHOICE} required />
	<button aria-label={LABELS.ADD_CHOICE} class="small"><Fa icon={faPlus}></Fa></button>
</form>

<style lang="scss">
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	h4 {
		font-weight: initial;
	}

	ol {
		padding-left: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: 1rem;

		button {
			float: right;
		}
	}
</style>

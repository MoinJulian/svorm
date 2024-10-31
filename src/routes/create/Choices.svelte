<script lang="ts">
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
				<button class="small" on:click={() => deleteChoice(index)}>x</button>
			</li>
		{/each}
	</ol>
{:else}
	<p>Please add a choice</p>
{/if}

<form on:submit|preventDefault={addChoice}>
	<input type="text" bind:value={next_choice} />
	<button>+</button>
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

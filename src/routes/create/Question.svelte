<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Choices from './Choices.svelte';

	export let question: App.question;

	const dispatch = createEventDispatcher();
	let title: string = 'choices' in question ? 'Multiple choice' : 'Question';
</script>

<div class="card">
	<header>
		<h3>{title}</h3>
		<button class="small" on:click={() => dispatch('delete')}>x</button>
	</header>
	<label>
		Question
		<input type="text" bind:value={question.question} />
	</label>
	{#if 'choices' in question}
		<Choices bind:choices={question.choices}></Choices>
	{/if}
	<label>
		Required
		<input type="checkbox" bind:checked={question.required} />
	</label>
</div>

<style>
	h3 {
		text-transform: uppercase;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

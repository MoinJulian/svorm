<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Choices from './Choices.svelte';

	const dispatch = createEventDispatcher();

	export let question: question;
	let title = 'choices' in question ? 'Multiple Choice' : 'Question';
</script>

<div class="card">
	<header>
		<h3>{title}</h3>
		<button on:click={() => dispatch('delete')}>x</button>
	</header>
	<label>
		Question
		<input type="text" bind:value={question.question} />
	</label>
	{#if 'choices' in question}
		<Choices bind:choices={question.choices}></Choices>
	{/if}
	<label>
		required
		<input type="checkbox" bind:checked={question.required} />
	</label>
</div>

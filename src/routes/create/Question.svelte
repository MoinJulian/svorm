<script lang="ts">
	import Asterisk from '$lib/components/Asterisk.svelte';
	import { LABELS } from '$lib/config';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import Choices from './Choices.svelte';

	export let question: App.question;
	let question_input: HTMLInputElement;

	const dispatch = createEventDispatcher();
	let title: string = 'choices' in question ? 'Multiple choice' : 'Question';

	onMount(() => {
		question_input?.focus();
	});
</script>

<div class="card">
	<header>
		<h3>{title}</h3>
	</header>
	<label>
		Question<Asterisk />
		<input type="text" bind:value={question.question} bind:this={question_input} />
	</label>
	{#if 'choices' in question}
		<Choices bind:choices={question.choices}></Choices>
	{/if}
	<div class="footer">
		<label>
			Required
			<input type="checkbox" bind:checked={question.required} />
		</label>
		<button
			class="small danger"
			aria-label={LABELS.DELETE_QUESTION}
			on:click={() => dispatch('delete')}><Fa icon={faTrash}></Fa></button
		>
	</div>
</div>

<style>
	h3 {
		text-transform: uppercase;
	}

	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>

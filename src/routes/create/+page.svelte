<script lang="ts">
	import { goto } from '$app/navigation';
	import Asterisk from '$lib/components/Asterisk.svelte';
	import Error from '$lib/components/Error.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Required from '$lib/components/Required.svelte';
	import { ERROR } from '$lib/config';
	import { fade } from 'svelte/transition';
	import Menu from './Menu.svelte';
	import Question from './Question.svelte';

	let title: string = '';
	let loading = false;
	let questions: App.question[] = [];
	let error_message = '';

	function addSimpleQuestion() {
		error_message = '';
		const simple_question: App.simple_question = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false
		};

		questions = [...questions, simple_question];
	}

	function adMultipleChoice() {
		error_message = '';
		const multiple_choice: App.multiple_choice = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false,
			choices: []
		};

		questions = [...questions, multiple_choice];
	}

	async function createSvorm() {
		error_message = '';
		const valid = svormIsValid();

		if (!valid) return;

		loading = true;

		const svorm: App.svorm = {
			title,
			questions
		};

		const response = await fetch('/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(svorm)
		});

		loading = false;

		if (!response.ok) {
			error_message = ERROR.NO_SVORM;
			return;
		}

		const data = await response.json();
		const { id } = data;

		if (!id) {
			error_message = 'Failed to create svorm';
			return;
		}

		goto(`/created/${id}`);
	}

	function deleteQuestion(question: App.question) {
		questions = questions.filter((q) => q !== question);
	}

	function svormIsValid(): boolean {
		if (title.length === 0) {
			error_message = 'Title is required';
			return false;
		}

		if (questions.length === 0) {
			error_message = 'At least one question is required';
			return false;
		}

		if (questions.some((question) => question.question.length === 0)) {
			error_message = 'All questions must have a question';
			return false;
		}

		if (questions.some((question) => 'choices' in question && question.choices.length <= 1)) {
			error_message = 'All multiple choice questions must have at least two choices';
			return false;
		}

		return true;
	}
</script>

<h2>Create a svorm</h2>

<Required noun={'Fields'} />

<label>
	Title<Asterisk />
	<input type="text" bind:value={title} />
</label>

{#if questions.length > 0}
	<ul class="cards">
		{#each questions as question (question.client_id)}
			<li transition:fade|local>
				<Question bind:question on:delete={() => deleteQuestion(question)}></Question>
			</li>
		{/each}
	</ul>
{/if}

<Menu on:question={addSimpleQuestion} on:choice={adMultipleChoice} on:create={createSvorm}></Menu>

<Loader {loading} />
<Error {error_message} />

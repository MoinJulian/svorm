<script lang="ts">
	import { goto } from '$app/navigation';
	import Asterisk from '$lib/components/Asterisk.svelte';
	import Error from '$lib/components/Error.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Required from '$lib/components/Required.svelte';
	import type { PageData } from './$types';
	import MultipleChoiceAnswer from './MultipleChoiceAnswer.svelte';
	import SimpleAnswer from './SimpleAnswer.svelte';

	export let data: PageData;

	let loading = false;
	let error_message = '';
	let answers_object: Record<string, string> = {};
	let choices_object: Record<string, number> = {};

	async function submitAnswers() {
		error_message = '';
		const valid = answersAreValid();

		if (!valid) return;

		loading = true;

		const simple_questions_answers: App.simple_question_answer[] = Object.entries(answers_object)
			.map(([id_string, answer]) => ({
				question_id: parseInt(id_string),
				answer
			}))
			.filter((a) => a.answer.length > 0);

		const multiple_choices_answers: App.multiple_choice_answer[] = Object.entries(
			choices_object
		).map(([id_string, choice]) => ({
			question_id: parseInt(id_string),
			choice
		}));

		const answers: App.answers = {
			simple_questions_answers,
			multiple_choices_answers
		};

		const response = await fetch('/answer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(answers)
		});

		loading = false;

		if (response.ok) {
			goto(`/answered/${data.svorm.id}`);
		} else {
			error_message = 'Submision was not successful';
		}
	}

	function answersAreValid(): boolean {
		const valid = data.questions.every((question) => {
			if ('choices' in question) {
				return !question.required || choices_object[question.id] !== undefined;
			} else {
				return !question.required || answers_object[question.id]?.length > 0;
			}
		});

		if (!valid) {
			error_message = 'Please fill in all required fields';
		}

		return valid;
	}
</script>

<h2>{data.svorm.title}</h2>

<Required noun="Questions" />

<form on:submit|preventDefault={submitAnswers}>
	<ul class="cards">
		{#each data.questions as question}
			<li class="card">
				<h3>
					{question.question}
					<Asterisk show={question.required} />
				</h3>
				{#if 'choices' in question}
					<MultipleChoiceAnswer {question} bind:choices_object />
				{:else}
					<SimpleAnswer {question} bind:answers_object />
				{/if}
			</li>
		{/each}
	</ul>
	<menu class="small-menu">
		<button type="submit">Send answers</button>
	</menu>
</form>

<Loader {loading} />
<Error {error_message} />

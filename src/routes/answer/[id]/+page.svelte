<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import MultipleChoiceAnswer from './MultipleChoiceAnswer.svelte';
	import SimpleAnswer from './SimpleAnswer.svelte';

	export let data: PageData;

	let answers_object: Record<string, string> = {};
	let choices_object: Record<string, number> = {};

	async function submitAnswers() {
		const valid = answersAreValid();

		if (!valid) return;

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

		if (response.ok) {
			goto(`/answered/${data.svorm.id}`);
		} else {
			window.alert('Submision was not successful');
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
			window.alert('Please fill in all required fields');
		}

		return valid;
	}
</script>

<h2>{data.svorm.title}</h2>

<form on:submit|preventDefault={submitAnswers}>
	<ul class="cards">
		{#each data.questions as question}
			<li class="card">
				<h3>
					{question.question}
					{#if question.required}
						<span class="danger">*</span>
					{/if}
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

<script lang="ts">
	import { goto } from '$app/navigation';
	import Menu from './Menu.svelte';
	import Question from './Question.svelte';

	let title: string = '';

	let questions: App.question[] = [];

	function addSimpleQuestion() {
		const simple_question: App.simple_question = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false
		};

		questions = [...questions, simple_question];
	}

	function adMultipleChoice() {
		const multiple_choice: App.multiple_choice = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false,
			choices: []
		};

		questions = [...questions, multiple_choice];
	}

	async function createSvorm() {
		const valid = svormIsValid();

		if (!valid) return;

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

		const data = await response.json();
		const { id } = data;

		if (!id) {
			window.alert('Failed to create svorm');
			return;
		}

		goto(`/created/${id}`);
	}

	function deleteQuestion(question: App.question) {
		questions = questions.filter((q) => q !== question);
	}

	function svormIsValid(): boolean {
		if (title.length === 0) {
			window.alert('Title is required');
			return false;
		}

		if (questions.length === 0) {
			window.alert('At least one question is required');
			return false;
		}

		if (questions.some((question) => question.question.length === 0)) {
			window.alert('All questions must have a question');
			return false;
		}

		if (questions.some((question) => 'choices' in question && question.choices.length <= 1)) {
			window.alert('All multiple choice questions must have at least two choices');
			return false;
		}

		return true;
	}
</script>

<h2>Create a svorm</h2>

<label>
	Title
	<input type="text" bind:value={title} />
</label>

<ul class="cards">
	{#each questions as question (question.client_id)}
		<li>
			<Question bind:question on:delete={() => deleteQuestion(question)}></Question>
		</li>
	{/each}
</ul>

<Menu on:question={addSimpleQuestion} on:choice={adMultipleChoice} on:create={createSvorm}></Menu>

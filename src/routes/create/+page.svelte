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

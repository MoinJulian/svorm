<script lang="ts">
	import Menu from './Menu.svelte';
	import Question from './Question.svelte';

	let title: string = '';

	let questions: question[] = [];

	function add_simple_question() {
		const simple_question: simple_question = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false
		};
		questions = [...questions, simple_question];
	}

	function add_multiple_choice() {
		const multiple_choice: multiple_choice = {
			client_id: crypto.randomUUID(),
			question: '',
			required: false,
			choices: []
		};
		questions = [...questions, multiple_choice];
	}

	function create_svorm() {
		//TODO
	}

	function delete_question(question: question) {
		questions = questions.filter((_question) => _question != question);
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
			<Question bind:question on:delete={() => delete_question(question)}></Question>
		</li>
	{/each}
</ul>

<Menu on:question={add_simple_question} on:choice={add_multiple_choice} on:create={create_svorm}
></Menu>

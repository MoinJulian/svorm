<script lang="ts">
	import Menu from './Menu.svelte';

	let title: string = '';

	let questions: question[] = [];

	function add_simple_question() {
		const simple_question: simple_question = {
			question: '',
			required: false
		};
		questions = [...questions, simple_question];
	}

	function add_multiple_choice() {
		const multiple_choice: multiple_choice = {
			question: '',
			required: false,
			choices: []
		};
		questions = [...questions, multiple_choice];
	}

	function create_svorm() {
		//TODO
	}
</script>

{JSON.stringify(questions)}

<h2>Create a svorm</h2>

<label>
	Title
	<input type="text" bind:value={title} />
</label>

<Menu on:question={add_simple_question} on:choice={add_multiple_choice} on:create={create_svorm}
></Menu>

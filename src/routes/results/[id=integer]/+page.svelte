<script lang="ts">
	import { HEADINGS } from '$lib/config';
	import MultipleChoiceResult from './MultipleChoiceResult.svelte';
	import SimpleQuestionResult from './SimpleQuestionResult.svelte';

	export let data: {
		svorm: App.svorm_db;
		questions: App.question_db[];
		simple_questions_results: App.simple_question_result[];
		multiple_choices_results: App.multiple_choice_result[];
	};
</script>

<h2>{data.svorm?.title} - {HEADINGS.RESULTS_SHORT}</h2>

<ol class="cards">
	{#each data.questions as question}
		<li class="card">
			<h3>{question.question}</h3>
			{#if 'choices' in question}
				<MultipleChoiceResult {question} multiple_choices_results={data.multiple_choices_results} />
			{:else}
				<SimpleQuestionResult {question} simple_questions_results={data.simple_questions_results} />
			{/if}
		</li>
	{/each}
</ol>

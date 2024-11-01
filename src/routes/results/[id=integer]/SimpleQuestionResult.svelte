<script lang="ts">
	import { TEXT } from '$lib/config';

	export let question: App.simple_question_db;
	export let simple_questions_results: App.simple_question_result[];
	const result: string[] =
		simple_questions_results.find((result) => result.question_id === question.id)?.result ?? [];
</script>

{#if result.length > 0}
	<ul class="answers">
		{#each result as answer}
			<li>{answer}</li>
		{/each}
	</ul>
{:else}
	<p>{TEXT.NO_ANSWERS}</p>
{/if}

<style>
	.answers {
		list-style-type: disc;
		padding-left: 1rem;
	}
</style>

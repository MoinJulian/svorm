<script lang="ts">
	import { frequency } from '$lib/utils';

	export let question: App.multiple_choice_db;
	export let multiple_choices_results: App.multiple_choice_result[];

	const result: number[] =
		multiple_choices_results.find((result) => result.question_id === question.id)?.result ?? [];
</script>

<ul class="choices">
	{#each question.choices as choice, index}
		{@const f = frequency(result, index)}
		<li><span class="frequency">{f}</span> &times; {choice}</li>
	{/each}
</ul>

<style>
	.choices {
		list-style-type: none;
	}

	.frequency {
		font-weight: bold;
	}
</style>

<script lang="ts">
	export let question: App.simple_question_db;
	export let answers_object: Record<string, string>;
</script>

<label>
	Answer
	<input type="text" bind:value={answers_object[question.id]} />
</label>

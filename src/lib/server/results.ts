import { getQuestions } from './questions';
import { supabase } from './supabase';
import { getSvorm } from './svorm';

export async function getResult(svorm_id: number): Promise<App.svorm_result | null> {
	const svorm = await getSvorm(svorm_id);

	if (!svorm) {
		return null;
	}

	const questions = await getQuestions(svorm.id);

	if (!questions) {
		return null;
	}

	const simple_questions_results: App.simple_question_result[] = [];
	const multiple_choices_results: App.multiple_choice_result[] = [];

	for (const question of questions) {
		if ('choices' in question) {
			const result = await getMultipleChoiceResult(question.id);

			if (!result) {
				return null;
			}

			multiple_choices_results.push({
				question_id: question.id,
				result
			});
		} else {
			const result = await getSimpleQuestionResult(question.id);

			if (!result) {
				return null;
			}

			simple_questions_results.push({
				question_id: question.id,
				result
			});
		}
	}

	return {
		svorm,
		questions,
		simple_questions_results,
		multiple_choices_results
	};
}

async function getMultipleChoiceResult(question_id: number): Promise<number[] | null> {
	const { data, error } = await supabase
		.from('multiple_choices_answers')
		.select()
		.eq('question_id', question_id);

	if (error) {
		console.log({ error });
		return null;
	}

	if (!data) {
		return null;
	}

	const choices = data.map((answer: App.multiple_choice_answer) => answer.choice);

	return choices;
}

async function getSimpleQuestionResult(question_id: number): Promise<string[] | null> {
	const { data, error } = await supabase
		.from('simple_questions_answers')
		.select()
		.eq('question_id', question_id);

	if (error) {
		console.log({ error });
		return null;
	}

	if (!data) {
		return null;
	}

	const answers = data.map((answer) => answer.answer);

	return answers;
}

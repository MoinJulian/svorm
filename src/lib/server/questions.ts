import { supabase } from './supabase';

export async function saveQuestions(questions: App.question[], svorm_id: number): Promise<boolean> {
	const simple_questions = [];
	const multiple_choices = [];

	for (let index = 0; index < questions.length; index++) {
		const question = questions[index];

		if ('choices' in question) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { client_id, ...question_without_id } = question;
			multiple_choices.push({
				...question_without_id,
				index,
				svorm_id
			});
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { client_id, ...question_without_id } = question;
			simple_questions.push({
				...question_without_id,
				index,
				svorm_id
			});
		}
	}

	const { error: error1 } = await supabase.from('simple_questions').insert(simple_questions);

	if (error1) {
		console.log(error1);
		return false;
	}

	const { error: error2 } = await supabase.from('multiple_choices').insert(multiple_choices);

	if (error2) {
		console.log(error2);
		return false;
	}

	return true;
}

export async function getQuestions(svorm_id: number): Promise<App.question_db[] | null> {
	const { data: simple_questions, error: error1 } = await supabase
		.from('simple_questions')
		.select('*')
		.eq('svorm_id', svorm_id);

	if (error1) {
		console.log({ error: error1 });
		return null;
	}

	if (!simple_questions) {
		return null;
	}

	const { data: multiple_choices, error: error2 } = await supabase
		.from('multiple_choices')
		.select('*')
		.eq('svorm_id', svorm_id);

	if (error2) {
		console.log({ error: error2 });
		return null;
	}

	if (!multiple_choices) {
		return null;
	}

	const questions = simple_questions.concat(multiple_choices);

	const sorted_questions = questions.sort((a, b) => a.index - b.index);

	return sorted_questions;
}

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// create types
		type simple_question = {
			client_id: string;
			question: string;
			required: boolean;
		};

		type multiple_choice = {
			client_id: string;
			question: string;
			required: boolean;
			choices: string[];
		};

		type question = simple_question | multiple_choice;

		type svorm = {
			title: string;
			questions: question[];
		};

		// answer types

		type svorm_db = {
			id: number;
			title: string;
			created_at: string;
		};

		type _db = {
			id: number;
			created_at: string;
			svorm_id: number;
			index: number;
		};

		type simple_question_db = Omit<simple_question, 'client_id'> & _db;
		type multiple_choice_db = Omit<multiple_choice, 'client_id'> & _db;

		type question_db = simple_question_db | multiple_choice_db;

		type simple_question_answer = {
			question_id: number;
			answer: string;
		};

		type multiple_choice_answer = {
			question_id: number;
			choice: number;
		};

		type answers = {
			simple_questions_answers: simple_question_answer[];
			multiple_choices_answers: multiple_choice_answer[];
		};

		// result types

		type simple_question_result = {
			question_id: number;
			result: string[];
		};

		type multiple_choice_result = {
			question_id: number;
			result: number[];
		};

		type svorm_result = {
			svorm: svorm_db;
			questions: question_db[];
			simple_questions_results: simple_question_result[];
			multiple_choices_results: multiple_choice_result[];
		};
	}
}

export {};

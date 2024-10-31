// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
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
	}
}

export {};

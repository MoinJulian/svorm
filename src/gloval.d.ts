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

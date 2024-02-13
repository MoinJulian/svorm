type simple_question = {
	question: string;
	required: boolean;
};

type multiple_choice = {
	question: string;
	required: boolean;
	choices: string[];
};

type question = simple_question | multiple_choice;

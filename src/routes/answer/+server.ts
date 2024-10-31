import { saveAnswers } from '$lib/server/answers';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const answers = await request.json();
	const saved = await saveAnswers(answers);

	if (saved) {
		return new Response(JSON.stringify({ message: 'Answers saved' }), { status: 201 });
	} else {
		return new Response(JSON.stringify({ message: 'Failed to save answers' }), { status: 500 });
	}
};

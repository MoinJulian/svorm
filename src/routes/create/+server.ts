import { saveQuestions } from '$lib/server/questions';
import { saveSvorm } from '$lib/server/svorm';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const svorm: App.svorm = await request.json();
	const svorm_id = await saveSvorm(svorm);

	if (!svorm_id) {
		return new Response(JSON.stringify({ message: 'Failed to save svorm' }), { status: 500 });
	}

	const saved = await saveQuestions(svorm.questions, svorm_id);

	if (saved) {
		return new Response(JSON.stringify({ id: svorm_id }), { status: 201 });
	} else {
		return new Response(JSON.stringify({ message: 'Failed to save questions' }), { status: 500 });
	}
};

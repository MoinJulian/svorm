import { getQuestions } from '$lib/server/questions';
import { getSvorm } from '$lib/server/svorm';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);
	const svorm = await getSvorm(id);

	if (!svorm) {
		throw error(404, 'There is no svorm with that id');
	}

	const questions = await getQuestions(svorm.id);

	if (!questions) {
		throw error(500, 'Failed to get questions');
	}

	return { svorm, questions };
};

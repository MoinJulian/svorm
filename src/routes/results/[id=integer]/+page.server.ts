import { getResult } from '$lib/server/results';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);

	const svorm_result = await getResult(id);

	if (!svorm_result) {
		throw error(404, 'There is no svorm result with that id');
	}

	return svorm_result;
};

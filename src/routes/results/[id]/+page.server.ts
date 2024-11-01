import { getResult } from '$lib/server/results';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = parseInt(params.id);

	const svorm_result = await getResult(id);

	if (!svorm_result) {
		return new Response(JSON.stringify({ message: 'Failed to get result' }), { status: 500 });
	}

	return svorm_result;
};

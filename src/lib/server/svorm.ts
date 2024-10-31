import { supabase } from './supabase';

export async function saveSvorm(svorm: App.svorm): Promise<number | null> {
	const { data, error } = await supabase.from('svorms').insert({ title: svorm.title }).select();

	if (error) {
		console.log(error);
		return null;
	}

	if (!data || data.length === 0) {
		return null;
	}

	const { id } = data[0];
	return id;
}

export async function getSvorm(id: number): Promise<App.svorm_db | null> {
	const { data, error } = await supabase.from('svorms').select('*').eq('id', id);

	if (error) {
		console.log(error);
		return null;
	}

	if (!data || data.length === 0) {
		return null;
	}

	const svorm: App.svorm_db = data[0];
	return svorm;
}

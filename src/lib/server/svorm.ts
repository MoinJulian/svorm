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

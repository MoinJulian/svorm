import { SECRET_SUPABASE_KEY } from '$env/static/private';
import type { Database } from '$lib/types/supabase';
import { createClient } from '@supabase/supabase-js';

const supabase_url = 'https://kxlmomtyczapvywhavcv.supabase.co';
export const supabase = createClient<Database>(supabase_url, SECRET_SUPABASE_KEY);

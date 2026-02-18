import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Category, PostType } from '@/types';

export async function getCategories(type?: PostType): Promise<Category[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('order_index');

  if (type) query = query.eq('post_type', type);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  return data as Category | null;
}

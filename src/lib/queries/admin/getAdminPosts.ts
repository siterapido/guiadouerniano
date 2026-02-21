import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  type: string;
  created_at: string;
  published_at: string | null;
  author_name: string | null;
  category_name: string | null;
  views_count: number;
}

export async function getAdminPosts(params?: {
  search?: string;
  status?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: AdminPost[]; count: number }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from('posts')
    .select(
      'id, title, slug, status, type, created_at, published_at, views_count, profiles!author_id(name), categories!category_id(name)',
      { count: 'exact' }
    )
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (params?.search) {
    query = query.ilike('title', `%${params.search}%`);
  }
  if (params?.status) {
    query = query.eq('status', params.status);
  }
  if (params?.type) {
    query = query.eq('type', params.type);
  }

  const { data, count } = await query;

  const posts: AdminPost[] = (data ?? []).map((p) => {
    const profile = p.profiles as unknown as { name: string | null } | null;
    const category = p.categories as unknown as { name: string | null } | null;
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      type: p.type,
      created_at: p.created_at,
      published_at: p.published_at,
      author_name: profile?.name ?? null,
      category_name: category?.name ?? null,
      views_count: p.views_count,
    };
  });

  return { data: posts, count: count ?? 0 };
}

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { mockPosts } from '@/lib/mock/posts';
import type { PostWithAuthor, PostType } from '@/types';

interface GetPostsOptions {
  type?: PostType;
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
  status?: 'published' | 'draft';
}

function applyMockFilters(options: GetPostsOptions): PostWithAuthor[] {
  const { type, categorySlug, featured, limit = 10, page = 1 } = options;
  let results = [...mockPosts];
  if (type) results = results.filter((p) => p.type === type);
  if (featured) results = results.filter((p) => p.featured);
  if (categorySlug) results = results.filter((p) => p.category.slug === categorySlug);
  const from = (page - 1) * limit;
  return results.slice(from, from + limit);
}

export async function getPosts(options: GetPostsOptions = {}): Promise<PostWithAuthor[]> {
  const { type, categorySlug, featured, limit = 10, page = 1, status = 'published' } = options;

  try {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, name, avatar_url),
        category:categories(id, name, slug, color)
      `)
      .eq('status', status)
      .is('deleted_at', null)
      .order('published_at', { ascending: false });

    if (type) query = query.eq('type', type);
    if (featured) query = query.eq('featured', true);
    if (categorySlug) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      if (cat) query = query.eq('category_id', cat.id);
    }

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, error } = await query;
    if (error) throw error;

    const rows = (data ?? []) as PostWithAuthor[];

    // Fallback para mock em desenvolvimento quando o banco estiver vazio
    if (rows.length === 0 && process.env.NODE_ENV === 'development') {
      return applyMockFilters(options);
    }

    return rows;
  } catch {
    // Em desenvolvimento, retorna mock para permitir visualização sem banco
    if (process.env.NODE_ENV === 'development') {
      return applyMockFilters(options);
    }
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostWithAuthor | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, name, avatar_url),
      category:categories(id, name, slug, color)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .is('deleted_at', null)
    .single();

  if (error || !data) return null;
  return data as PostWithAuthor;
}

export async function getFeaturedPost(): Promise<PostWithAuthor | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(id, name, avatar_url),
      category:categories(id, name, slug, color)
    `)
    .eq('status', 'published')
    .eq('featured', true)
    .is('deleted_at', null)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  return data as PostWithAuthor | null;
}

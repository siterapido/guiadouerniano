import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export interface PendingComment {
  id: string;
  content: string;
  created_at: string;
  author_name: string | null;
  author_email: string;
  post_id: string;
  post_title: string;
  post_slug: string;
}

export async function getPendingComments(): Promise<PendingComment[]> {
  const { data } = await supabaseAdmin
    .from('comments')
    .select(
      'id, content, created_at, author_id, post_id, profiles!author_id(name, email), posts!post_id(title, slug)'
    )
    .eq('is_approved', false)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  return (data ?? []).map((c) => {
    const profile = c.profiles as unknown as { name: string | null; email: string } | null;
    const post = c.posts as unknown as { title: string; slug: string } | null;
    return {
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      author_name: profile?.name ?? null,
      author_email: profile?.email ?? '',
      post_id: c.post_id,
      post_title: post?.title ?? '',
      post_slug: post?.slug ?? '',
    };
  });
}

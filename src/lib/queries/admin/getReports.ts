import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export interface AdminReport {
  id: string;
  reason: string;
  created_at: string;
  reporter_name: string | null;
  reporter_email: string;
  post_id: string | null;
  post_title: string | null;
  post_slug: string | null;
  comment_id: string | null;
}

export async function getReports(): Promise<AdminReport[]> {
  const { data } = await supabaseAdmin
    .from('reports')
    .select(
      'id, reason, created_at, reporter_id, post_id, comment_id, profiles!reporter_id(name, email), posts!post_id(title, slug)'
    )
    .eq('is_resolved', false)
    .order('created_at', { ascending: true });

  return (data ?? []).map((r) => {
    const profile = r.profiles as unknown as { name: string | null; email: string } | null;
    const post = r.posts as unknown as { title: string; slug: string } | null;
    return {
      id: r.id,
      reason: r.reason,
      created_at: r.created_at,
      reporter_name: profile?.name ?? null,
      reporter_email: profile?.email ?? '',
      post_id: r.post_id,
      post_title: post?.title ?? null,
      post_slug: post?.slug ?? null,
      comment_id: r.comment_id,
    };
  });
}

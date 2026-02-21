import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export interface DashboardStats {
  publishedPosts: number;
  draftPosts: number;
  upcomingEvents: number;
  totalUsers: number;
  pendingComments: number;
  openReports: number;
  recentPosts: Array<{
    id: string;
    title: string;
    status: string;
    type: string;
    created_at: string;
    author_name: string | null;
  }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    publishedRes,
    draftRes,
    eventsRes,
    usersRes,
    commentsRes,
    reportsRes,
    recentPostsRes,
  ] = await Promise.all([
    supabaseAdmin
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'published')
      .is('deleted_at', null),
    supabaseAdmin
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'draft')
      .is('deleted_at', null),
    supabaseAdmin
      .from('events')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'upcoming')
      .is('deleted_at', null),
    supabaseAdmin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true),
    supabaseAdmin
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', false)
      .is('deleted_at', null),
    supabaseAdmin
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .eq('is_resolved', false),
    supabaseAdmin
      .from('posts')
      .select('id, title, status, type, created_at, profiles!author_id(name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  const recentPosts = (recentPostsRes.data ?? []).map((p) => {
    const profile = p.profiles as unknown as { name: string | null } | null;
    return {
      id: p.id,
      title: p.title,
      status: p.status,
      type: p.type,
      created_at: p.created_at,
      author_name: profile?.name ?? null,
    };
  });

  return {
    publishedPosts: publishedRes.count ?? 0,
    draftPosts: draftRes.count ?? 0,
    upcomingEvents: eventsRes.count ?? 0,
    totalUsers: usersRes.count ?? 0,
    pendingComments: commentsRes.count ?? 0,
    openReports: reportsRes.count ?? 0,
    recentPosts,
  };
}

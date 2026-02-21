import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';

export interface AdminEvent {
  id: string;
  title: string;
  slug: string;
  status: string;
  type: string;
  campus: string | null;
  starts_at: string;
  created_at: string;
  organizer_name: string | null;
}

export async function getAdminEvents(params?: {
  status?: string;
  campus?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ data: AdminEvent[]; count: number }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from('events')
    .select('id, title, slug, status, type, campus, starts_at, created_at, profiles!organizer_id(name)', {
      count: 'exact',
    })
    .is('deleted_at', null)
    .order('starts_at', { ascending: false })
    .range(from, to);

  if (params?.status) {
    query = query.eq('status', params.status);
  }
  if (params?.campus) {
    query = query.eq('campus', params.campus);
  }

  const { data, count } = await query;

  const events: AdminEvent[] = (data ?? []).map((e) => {
    const profile = e.profiles as unknown as { name: string | null } | null;
    return {
      id: e.id,
      title: e.title,
      slug: e.slug,
      status: e.status,
      type: e.type,
      campus: e.campus,
      starts_at: e.starts_at,
      created_at: e.created_at,
      organizer_name: profile?.name ?? null,
    };
  });

  return { data: events, count: count ?? 0 };
}

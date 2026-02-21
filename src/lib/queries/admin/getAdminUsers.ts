import 'server-only';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { UserRole } from '@/types';

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  campus: string | null;
  is_active: boolean;
  created_at: string;
}

export async function getAdminUsers(params?: {
  page?: number;
  pageSize?: number;
}): Promise<{ data: AdminUser[]; count: number }> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 30;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count } = await supabaseAdmin
    .from('profiles')
    .select('id, name, email, role, campus, is_active, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  return {
    data: (data ?? []) as AdminUser[],
    count: count ?? 0,
  };
}

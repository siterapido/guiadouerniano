import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { AdminShell } from '@/components/admin/AdminShell';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin — Guia do UERNIANO',
    default: 'Admin — Guia do UERNIANO',
  },
  robots: 'noindex,nofollow',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, name, avatar_url')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/membros');
  }

  // Get badge counts for sidebar
  const [commentsRes, reportsRes] = await Promise.all([
    supabaseAdmin
      .from('comments')
      .select('id', { count: 'exact', head: true })
      .eq('is_approved', false)
      .is('deleted_at', null),
    supabaseAdmin
      .from('reports')
      .select('id', { count: 'exact', head: true })
      .eq('is_resolved', false),
  ]);

  return (
    <AdminShell
      userName={profile.name}
      userAvatar={profile.avatar_url}
      pendingComments={commentsRes.count ?? 0}
      openReports={reportsRes.count ?? 0}
    >
      {children}
    </AdminShell>
  );
}

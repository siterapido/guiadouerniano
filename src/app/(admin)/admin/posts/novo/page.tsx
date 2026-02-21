import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminPostForm } from '@/components/admin/AdminPostForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Novo post' };

export default async function NewPostPage() {
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, name, slug')
    .eq('is_active', true)
    .order('name');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Novo post</h1>
        <p className="text-sm text-neutro-600 mt-1">Crie um novo post para o blog ou guia</p>
      </div>
      <AdminPostForm categories={categories ?? []} />
    </div>
  );
}

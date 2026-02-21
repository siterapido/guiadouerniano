import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminPostForm } from '@/components/admin/AdminPostForm';
import type { Post } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Editar post' };

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [{ data: post }, { data: categories }] = await Promise.all([
    supabaseAdmin.from('posts').select('*').eq('id', params.id).single(),
    supabaseAdmin
      .from('categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name'),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Editar post</h1>
        <p className="text-sm text-neutro-600 mt-1 truncate max-w-lg">{post.title}</p>
      </div>
      <AdminPostForm categories={categories ?? []} post={post as Post} />
    </div>
  );
}

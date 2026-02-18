'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { PostType } from '@/types';

const postSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres').max(200),
  excerpt: z.string().min(10, 'Resumo muito curto').max(500).optional(),
  content: z.string().min(10, 'Conteúdo muito curto'),
  type: z.enum(['guide', 'blog'] as const),
  category_id: z.string().uuid('Selecione uma categoria').optional().nullable(),
  cover_image_url: z.string().url().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived'] as const).default('draft'),
});

export type PostActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  slug?: string;
};

async function assertEditor(supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['editor', 'admin'].includes(profile.role ?? '')) {
    throw new Error('Permissão negada');
  }

  return user;
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function createPost(_: PostActionResult, formData: FormData): Promise<PostActionResult> {
  const supabase = await createSupabaseServerClient();

  let user;
  try {
    user = await assertEditor(supabase);
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    title: formData.get('title') as string,
    excerpt: (formData.get('excerpt') as string) || undefined,
    content: formData.get('content') as string,
    type: formData.get('type') as PostType,
    category_id: (formData.get('category_id') as string) || null,
    cover_image_url: (formData.get('cover_image_url') as string) || null,
    status: (formData.get('status') as string) || 'draft',
  };

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const slug = toSlug(parsed.data.title);

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...parsed.data, slug, author_id: user.id })
    .select('slug')
    .single();

  if (error) {
    return { success: false, error: 'Erro ao criar post.' };
  }

  revalidatePath('/blog');
  revalidatePath('/guia');
  return { success: true, slug: data.slug };
}

export async function updatePost(postId: string, _: PostActionResult, formData: FormData): Promise<PostActionResult> {
  const supabase = await createSupabaseServerClient();

  try {
    await assertEditor(supabase);
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    title: formData.get('title') as string,
    excerpt: (formData.get('excerpt') as string) || undefined,
    content: formData.get('content') as string,
    type: formData.get('type') as PostType,
    category_id: (formData.get('category_id') as string) || null,
    cover_image_url: (formData.get('cover_image_url') as string) || null,
    status: (formData.get('status') as string) || 'draft',
  };

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const { error } = await supabase
    .from('posts')
    .update(parsed.data)
    .eq('id', postId);

  if (error) {
    return { success: false, error: 'Erro ao atualizar post.' };
  }

  revalidatePath('/blog');
  revalidatePath('/guia');
  return { success: true };
}

export async function deletePost(postId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await assertEditor(supabase);

  await supabase
    .from('posts')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', postId);

  revalidatePath('/blog');
  revalidatePath('/guia');
  redirect('/blog');
}

export async function publishPost(postId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  await assertEditor(supabase);

  await supabase
    .from('posts')
    .update({ status: 'published' })
    .eq('id', postId);

  revalidatePath('/blog');
  revalidatePath('/guia');
}

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const commentSchema = z.object({
  content: z.string().min(3, 'Comentário muito curto').max(2000, 'Máximo 2000 caracteres'),
  parent_id: z.string().uuid('ID inválido').optional().nullable(),
});

export type CommentActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createComment(
  _: CommentActionResult,
  formData: FormData,
  postId: string
): Promise<CommentActionResult> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Você precisa estar logado para comentar.' };
  }

  const raw = {
    content: formData.get('content') as string,
    parent_id: (formData.get('parent_id') as string) || null,
  };

  const parsed = commentSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  // Sanitize content server-side — strip all HTML tags
  const sanitizedContent = parsed.data.content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    author_id: user.id,
    content: sanitizedContent,
    parent_id: parsed.data.parent_id ?? null,
  });

  if (error) {
    return { success: false, error: 'Erro ao publicar comentário. Tente novamente.' };
  }

  revalidatePath(`/blog/${postId}`);
  return { success: true };
}

export async function deleteComment(commentId: string, path: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('comments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', commentId)
    .eq('author_id', user.id); // author can only delete their own

  revalidatePath(path);
}

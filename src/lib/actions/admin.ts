'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import type { UserRole } from '@/types';

export type AdminActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// ===== Auth helpers =====

async function assertAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    throw new Error('Permissão negada: apenas administradores');
  }

  return user;
}

// ===== Users =====

export async function updateUserRole(
  userId: string,
  role: UserRole
): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ role })
    .eq('id', userId);

  if (error) return { success: false, error: 'Erro ao atualizar role.' };

  revalidatePath('/admin/usuarios');
  return { success: true };
}

export async function deactivateUser(userId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ is_active: false })
    .eq('id', userId);

  if (error) return { success: false, error: 'Erro ao desativar usuário.' };

  revalidatePath('/admin/usuarios');
  return { success: true };
}

export async function reactivateUser(userId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ is_active: true })
    .eq('id', userId);

  if (error) return { success: false, error: 'Erro ao reativar usuário.' };

  revalidatePath('/admin/usuarios');
  return { success: true };
}

// ===== Comments =====

export async function approveComment(commentId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('comments')
    .update({ is_approved: true })
    .eq('id', commentId);

  if (error) return { success: false, error: 'Erro ao aprovar comentário.' };

  revalidatePath('/admin/comentarios');
  return { success: true };
}

export async function adminDeleteComment(commentId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('comments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', commentId);

  if (error) return { success: false, error: 'Erro ao deletar comentário.' };

  revalidatePath('/admin/comentarios');
  return { success: true };
}

// ===== Reports =====

export async function resolveReport(
  reportId: string,
  deleteContent: boolean
): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();

  if (deleteContent) {
    const { data: report } = await supabase
      .from('reports')
      .select('post_id, comment_id')
      .eq('id', reportId)
      .single();

    if (report?.comment_id) {
      await supabase
        .from('comments')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', report.comment_id);
    } else if (report?.post_id) {
      await supabase
        .from('posts')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', report.post_id);
    }
  }

  const { error } = await supabase
    .from('reports')
    .update({ is_resolved: true })
    .eq('id', reportId);

  if (error) return { success: false, error: 'Erro ao resolver denúncia.' };

  revalidatePath('/admin/denuncias');
  return { success: true };
}

export async function dismissReport(reportId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('reports')
    .update({ is_resolved: true })
    .eq('id', reportId);

  if (error) return { success: false, error: 'Erro ao dispensar denúncia.' };

  revalidatePath('/admin/denuncias');
  return { success: true };
}

// ===== Categories =====

const categorySchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug inválido'),
  description: z.string().max(500).optional(),
  icon: z.string().max(50).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Cor inválida').optional(),
  post_type: z.enum(['guide', 'blog'] as const),
  order_index: z.coerce.number().int().min(0).default(0),
});

export async function createCategory(
  _: AdminActionResult,
  formData: FormData
): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: (formData.get('description') as string) || undefined,
    icon: (formData.get('icon') as string) || undefined,
    color: (formData.get('color') as string) || undefined,
    post_type: formData.get('post_type') as string,
    order_index: formData.get('order_index') as string,
  };

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('categories').insert(parsed.data);

  if (error) return { success: false, error: 'Erro ao criar categoria.' };

  revalidatePath('/admin/categorias');
  revalidatePath('/blog');
  revalidatePath('/guia');
  return { success: true };
}

export async function updateCategory(
  id: string,
  _: AdminActionResult,
  formData: FormData
): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    description: (formData.get('description') as string) || undefined,
    icon: (formData.get('icon') as string) || undefined,
    color: (formData.get('color') as string) || undefined,
    post_type: formData.get('post_type') as string,
    order_index: formData.get('order_index') as string,
  };

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('categories').update(parsed.data).eq('id', id);

  if (error) return { success: false, error: 'Erro ao atualizar categoria.' };

  revalidatePath('/admin/categorias');
  revalidatePath('/blog');
  revalidatePath('/guia');
  return { success: true };
}

export async function deleteCategory(id: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from('categories').update({ is_active: false }).eq('id', id);

  if (error) return { success: false, error: 'Erro ao remover categoria.' };

  revalidatePath('/admin/categorias');
  return { success: true };
}

// ===== Materials =====

const materialSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres').max(200),
  description: z.string().max(500).optional(),
  file_url: z.string().url('URL inválida'),
  file_type: z.enum(['pdf', 'video', 'link', 'image', 'doc'] as const),
  category: z.string().max(100).optional(),
  is_public: z.boolean().default(false),
});

export async function createMaterial(
  _: AdminActionResult,
  formData: FormData
): Promise<AdminActionResult> {
  let user;
  try {
    user = await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || undefined,
    file_url: formData.get('file_url') as string,
    file_type: formData.get('file_type') as string,
    category: (formData.get('category') as string) || undefined,
    is_public: formData.get('is_public') === 'true',
  };

  const parsed = materialSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('materials')
    .insert({ ...parsed.data, uploaded_by: user.id });

  if (error) return { success: false, error: 'Erro ao criar material.' };

  revalidatePath('/admin/materiais');
  revalidatePath('/membros/materiais');
  return { success: true };
}

export async function deleteMaterial(id: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('materials')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: 'Erro ao remover material.' };

  revalidatePath('/admin/materiais');
  revalidatePath('/membros/materiais');
  return { success: true };
}

// ===== Events =====

export async function cancelEvent(eventId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('events')
    .update({ status: 'cancelled' })
    .eq('id', eventId);

  if (error) return { success: false, error: 'Erro ao cancelar evento.' };

  revalidatePath('/admin/eventos');
  revalidatePath('/eventos');
  return { success: true };
}

export async function adminDeleteEvent(eventId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('events')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', eventId);

  if (error) return { success: false, error: 'Erro ao deletar evento.' };

  revalidatePath('/admin/eventos');
  revalidatePath('/eventos');
  return { success: true };
}

// ===== Posts =====

export async function archivePost(postId: string): Promise<AdminActionResult> {
  try {
    await assertAdmin();
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('posts')
    .update({ status: 'archived' })
    .eq('id', postId);

  if (error) return { success: false, error: 'Erro ao arquivar post.' };

  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  return { success: true };
}

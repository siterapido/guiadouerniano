'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Campus } from '@/types';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(100),
  bio: z.string().max(500, 'Máximo 500 caracteres').optional().nullable(),
  campus: z.enum([
    'CAMEAM', 'CAP', 'CATU', 'FACULESTE', 'FACEN', 'FANAT', 'FACS', 'FAFOP',
    'FASC', 'FASEC', 'FASSB', 'FAUS', 'UERN_CENTRAL',
  ] as const).optional().nullable(),
  course: z.string().max(100).optional().nullable(),
  semester: z.number().int().min(1).max(20).optional().nullable(),
  avatar_url: z.string().url().optional().nullable(),
});

export type ProfileActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function updateProfile(_: ProfileActionResult, formData: FormData): Promise<ProfileActionResult> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Não autenticado.' };
  }

  const raw = {
    name: formData.get('name') as string,
    bio: (formData.get('bio') as string) || null,
    campus: (formData.get('campus') as Campus) || null,
    course: (formData.get('course') as string) || null,
    semester: formData.get('semester') ? Number(formData.get('semester')) : null,
    avatar_url: (formData.get('avatar_url') as string) || null,
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const { error } = await supabase
    .from('profiles')
    .update(parsed.data)
    .eq('id', user.id);

  if (error) {
    return { success: false, error: 'Erro ao atualizar perfil.' };
  }

  revalidatePath('/membros');
  return { success: true };
}

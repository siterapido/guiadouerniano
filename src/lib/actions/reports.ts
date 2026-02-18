'use server';

import { z } from 'zod';
import { createSupabaseServerClient } from '@/lib/supabase/server';

const reportSchema = z.object({
  reason: z.enum(['incorrect', 'spam', 'offensive', 'other'], { error: 'Selecione um motivo' }),
  description: z.string().max(500, 'Máximo 500 caracteres').optional(),
});

export type ReportActionResult = {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function createReport(
  _: ReportActionResult,
  formData: FormData,
  postId: string
): Promise<ReportActionResult> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Você precisa estar logado para denunciar.' };
  }

  const raw = {
    reason: formData.get('reason') as string,
    description: formData.get('description') as string | undefined,
  };

  const parsed = reportSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const { error } = await supabase.from('post_reports').insert({
    post_id: postId,
    reporter_id: user.id,
    reason: parsed.data.reason,
    description: parsed.data.description ?? null,
  });

  if (error) {
    return { success: false, error: 'Erro ao enviar denúncia. Tente novamente.' };
  }

  return { success: true };
}

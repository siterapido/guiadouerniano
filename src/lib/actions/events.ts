'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { EventType, Campus } from '@/types';

const eventSchema = z.object({
  title: z.string().min(5, 'Título muito curto').max(200),
  description: z.string().max(5000).optional().nullable(),
  type: z.enum(['lecture', 'workshop', 'assembly', 'cultural', 'sport', 'protest', 'other'] as const),
  campus: z.enum([
    'CAMEAM', 'CAP', 'CATU', 'FACULESTE', 'FACEN', 'FANAT', 'FACS', 'FAFOP',
    'FASC', 'FASEC', 'FASSB', 'FAUS', 'UERN_CENTRAL',
  ] as const).optional().nullable(),
  location: z.string().max(300).optional().nullable(),
  start_date: z.string().datetime(),
  end_date: z.string().datetime().optional().nullable(),
  is_public: z.boolean().default(true),
  cover_image_url: z.string().url().optional().nullable(),
});

export type EventActionResult = {
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

export async function createEvent(_: EventActionResult, formData: FormData): Promise<EventActionResult> {
  const supabase = await createSupabaseServerClient();

  let user;
  try {
    user = await assertEditor(supabase);
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    type: formData.get('type') as EventType,
    campus: (formData.get('campus') as Campus) || null,
    location: (formData.get('location') as string) || null,
    start_date: formData.get('start_date') as string,
    end_date: (formData.get('end_date') as string) || null,
    is_public: formData.get('is_public') !== 'false',
    cover_image_url: (formData.get('cover_image_url') as string) || null,
  };

  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const slug = `${toSlug(parsed.data.title)}-${Date.now()}`;

  const { data, error } = await supabase
    .from('events')
    .insert({ ...parsed.data, slug, organizer_id: user.id })
    .select('slug')
    .single();

  if (error) {
    return { success: false, error: 'Erro ao criar evento.' };
  }

  revalidatePath('/eventos');
  return { success: true, slug: data.slug };
}

export async function updateEvent(eventId: string, _: EventActionResult, formData: FormData): Promise<EventActionResult> {
  const supabase = await createSupabaseServerClient();

  try {
    await assertEditor(supabase);
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }

  const raw = {
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    type: formData.get('type') as EventType,
    campus: (formData.get('campus') as Campus) || null,
    location: (formData.get('location') as string) || null,
    start_date: formData.get('start_date') as string,
    end_date: (formData.get('end_date') as string) || null,
    is_public: formData.get('is_public') !== 'false',
    cover_image_url: (formData.get('cover_image_url') as string) || null,
  };

  const parsed = eventSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((e) => {
      const key = e.path[0];
      if (key !== undefined && typeof key !== 'symbol') fieldErrors[String(key)] = e.message;
    });
    return { success: false, fieldErrors };
  }

  const { error } = await supabase
    .from('events')
    .update(parsed.data)
    .eq('id', eventId);

  if (error) {
    return { success: false, error: 'Erro ao atualizar evento.' };
  }

  revalidatePath('/eventos');
  return { success: true };
}

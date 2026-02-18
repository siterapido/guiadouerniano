import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { EventWithOrganizer } from '@/types';

interface GetEventsOptions {
  status?: 'upcoming' | 'ongoing' | 'past';
  limit?: number;
  page?: number;
}

export async function getEvents(options: GetEventsOptions = {}): Promise<EventWithOrganizer[]> {
  const { status, limit = 10, page = 1 } = options;
  const supabase = await createSupabaseServerClient();

  let query = supabase
    .from('events')
    .select(`
      *,
      organizer:profiles(id, name, avatar_url)
    `)
    .eq('is_public', true)
    .is('deleted_at', null)
    .order('starts_at', { ascending: true });

  if (status) query = query.eq('status', status);
  else query = query.in('status', ['upcoming', 'ongoing']);

  const from = (page - 1) * limit;
  query = query.range(from, from + limit - 1);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as EventWithOrganizer[];
}

export async function getEventBySlug(slug: string): Promise<EventWithOrganizer | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('events')
    .select(`
      *,
      organizer:profiles(id, name, avatar_url)
    `)
    .eq('slug', slug)
    .eq('is_public', true)
    .is('deleted_at', null)
    .single();
  return data as EventWithOrganizer | null;
}

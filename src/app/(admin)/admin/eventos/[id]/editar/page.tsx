import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminEventForm } from '@/components/admin/AdminEventForm';
import type { Event } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Editar evento' };

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const { data: event } = await supabaseAdmin
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Editar evento</h1>
        <p className="text-sm text-neutro-600 mt-1 truncate max-w-lg">{event.title}</p>
      </div>
      <AdminEventForm event={event as Event} />
    </div>
  );
}

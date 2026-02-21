import { AdminEventForm } from '@/components/admin/AdminEventForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Novo evento' };

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Novo evento</h1>
        <p className="text-sm text-neutro-600 mt-1">Adicione um evento ao calendário</p>
      </div>
      <AdminEventForm />
    </div>
  );
}

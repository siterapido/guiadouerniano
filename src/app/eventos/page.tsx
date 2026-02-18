import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { EventCard } from '@/components/content/EventCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { getEvents } from '@/lib/queries/getEvents';
import { Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import type { EventWithOrganizer } from '@/types';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Eventos',
  description: 'Próximos eventos, encontros e atividades do Movimento Correnteza e da UERN.',
};

export default async function EventosPage() {
  const events = await getEvents({ limit: 12 });

  return (
    <PageLayout>
      <Container className="py-8">
        <h1 className="font-display font-extrabold text-heading-xl text-neutro-900 mb-2">
          Eventos
        </h1>
        <p className="text-neutro-600 mb-8">
          Próximos encontros, assembleias e atividades.
        </p>

        {events.length === 0 ? (
          <EmptyState
            title="Nenhum evento próximo"
            description="Fique de olho aqui para não perder nada!"
            icon={<Calendar className="w-8 h-8" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event as EventWithOrganizer} />
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

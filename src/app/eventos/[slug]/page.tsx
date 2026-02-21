import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { getEventBySlug } from '@/lib/queries/getEvents';
import { formatDateTime } from '@/lib/utils/format';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

interface EventoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: 'Evento não encontrado' };
  return {
    title: event.title,
    description: event.meta_description ?? event.description ?? undefined,
  };
}

export default async function EventoPage({ params }: EventoPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const statusLabels = { upcoming: 'Em breve', ongoing: 'Acontecendo agora', past: 'Encerrado', cancelled: 'Cancelado' };
  const statusVariants = { upcoming: 'primary' as const, ongoing: 'success' as const, past: 'outline' as const, cancelled: 'danger' as const };

  return (
    <PageLayout>
      {event.cover_image_url && (
        <div className="relative aspect-[3/1] max-h-[320px] overflow-hidden">
          <Image src={event.cover_image_url} alt={event.title} fill className="object-cover" priority sizes="100vw" />
        </div>
      )}

      <Container size="md" className="py-8">
        <Breadcrumb
          items={[{ label: 'Eventos', href: '/eventos' }, { label: event.title }]}
          className="mb-6"
        />

        <div className="flex items-center gap-2 mb-4">
          <Badge variant={statusVariants[event.status]}>{statusLabels[event.status]}</Badge>
          {event.campus && (
            <Badge variant="outline" className="capitalize">{event.campus}</Badge>
          )}
        </div>

        <h1 className="font-display font-extrabold text-display-lg text-neutro-900 mb-6 leading-tight">
          {event.title}
        </h1>

        {/* Detalhes */}
        <div className="bg-neutro-100 rounded-xl p-5 mb-8 space-y-3">
          <div className="flex items-center gap-3 text-sm text-neutro-800">
            <Calendar className="w-5 h-5 text-azul-correnteza flex-shrink-0" />
            <div>
              <p className="font-medium">{formatDateTime(event.starts_at)}</p>
              {event.ends_at !== event.starts_at && (
                <p className="text-neutro-600">até {formatDateTime(event.ends_at)}</p>
              )}
            </div>
          </div>
          {event.location && (
            <div className="flex items-center gap-3 text-sm text-neutro-800">
              <MapPin className="w-5 h-5 text-azul-correnteza flex-shrink-0" />
              <div>
                <p className="font-medium">{event.location}</p>
                {event.location_url && (
                  <a href={event.location_url} target="_blank" rel="noopener noreferrer" className="text-azul-correnteza text-xs flex items-center gap-1 mt-0.5 hover:underline">
                    Ver no mapa <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
          {event.max_attendees && (
            <div className="flex items-center gap-3 text-sm text-neutro-800">
              <Users className="w-5 h-5 text-azul-correnteza flex-shrink-0" />
              <span>Máximo de {event.max_attendees} participantes</span>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-neutro-800 pt-2 border-t border-neutro-200">
            <Avatar src={event.organizer.avatar_url} name={event.organizer.name} size="xs" />
            <span>Organizado por <strong>{event.organizer.name}</strong></span>
          </div>
        </div>

        {(event.description || event.content) && (
          <div className="prose prose-lg max-w-none">
            {event.content ? (
              <div dangerouslySetInnerHTML={{ __html: event.content }} />
            ) : (
              <p>{event.description}</p>
            )}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

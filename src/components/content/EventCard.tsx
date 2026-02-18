import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import type { EventWithOrganizer } from '@/types';

interface EventCardProps {
  event: EventWithOrganizer;
  className?: string;
}

const statusVariantMap = {
  upcoming: 'primary' as const,
  ongoing: 'success' as const,
  past: 'outline' as const,
  cancelled: 'danger' as const,
};

const statusLabelMap = {
  upcoming: 'Em breve',
  ongoing: 'Acontecendo',
  past: 'Encerrado',
  cancelled: 'Cancelado',
};

export function EventCard({ event, className }: EventCardProps) {
  const href = `/eventos/${event.slug}`;
  const date = new Date(event.starts_at);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();

  return (
    <article
      className={cn(
        'group bg-white rounded-xl overflow-hidden border border-neutro-200 shadow-sm hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1',
        className
      )}
    >
      {/* Imagem / Data placeholder */}
      <Link href={href} className="block relative aspect-[3/1] overflow-hidden bg-gradient-to-br from-azul-uern to-azul-correnteza">
        {event.cover_image_url ? (
          <Image src={event.cover_image_url} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-70" sizes="(max-width: 768px) 100vw, 50vw" />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="font-display font-extrabold text-5xl leading-none">{day}</p>
            <p className="font-body font-semibold text-sm tracking-wider">{month}</p>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={statusVariantMap[event.status]}>
            {statusLabelMap[event.status]}
          </Badge>
          {event.campus && (
            <span className="text-xs text-neutro-600 capitalize">{event.campus}</span>
          )}
        </div>

        <Link href={href} className="no-underline">
          <h2 className="font-display font-bold text-neutro-900 text-heading-sm leading-snug line-clamp-2 group-hover:text-azul-correnteza transition-colors mb-3">
            {event.title}
          </h2>
        </Link>

        <div className="space-y-1.5 text-sm text-neutro-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-azul-correnteza flex-shrink-0" />
            <span>{formatDateTime(event.starts_at)}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-azul-correnteza flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          {event.max_attendees && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-azul-correnteza flex-shrink-0" />
              <span>Máx. {event.max_attendees} participantes</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

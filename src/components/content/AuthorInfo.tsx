import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface AuthorInfoProps {
  name: string;
  avatarUrl?: string | null;
  role?: string;
  date?: string;
  readingTime?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function AuthorInfo({ name, avatarUrl, role, date, readingTime, size = 'md', className }: AuthorInfoProps) {
  const isSmall = size === 'sm';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('relative rounded-full overflow-hidden bg-[--azul-correnteza] flex-shrink-0', isSmall ? 'w-8 h-8' : 'w-10 h-10')}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`Foto de ${name}`}
            fill
            className="object-cover"
            sizes={isSmall ? '32px' : '40px'}
          />
        ) : (
          <span className={cn('absolute inset-0 flex items-center justify-center text-white font-semibold', isSmall ? 'text-xs' : 'text-sm')}>
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className={cn('font-semibold text-[--neutro-900] truncate', isSmall ? 'text-sm' : 'text-base')}>
          {name}
        </p>
        {(role || date || readingTime) && (
          <p className={cn('text-[--neutro-600] truncate', isSmall ? 'text-xs' : 'text-sm')}>
            {[role, date, readingTime].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}

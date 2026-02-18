import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: { px: 24, cls: 'w-6 h-6 text-xs' },
  sm: { px: 32, cls: 'w-8 h-8 text-sm' },
  md: { px: 40, cls: 'w-10 h-10 text-sm' },
  lg: { px: 56, cls: 'w-14 h-14 text-base' },
  xl: { px: 80, cls: 'w-20 h-20 text-lg' },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const { px, cls } = sizeMap[size];
  const initials = name ? getInitials(name) : '?';

  return (
    <div
      className={cn('rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-azul-claro text-azul-correnteza font-semibold', cls, className)}
    >
      {src ? (
        <Image
          src={src}
          alt={name ?? 'Avatar'}
          width={px}
          height={px}
          className="w-full h-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  );
}

import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface QuickAccessCardProps {
  title: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  color?: string;
  className?: string;
}

export function QuickAccessCard({ title, description, href, icon, color, className }: QuickAccessCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col gap-3 p-4 rounded-xl border border-[--neutro-200] bg-white',
        'hover:shadow-md hover:border-[--azul-correnteza]/30 transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]',
        'group min-h-[44px]',
        className
      )}
    >
      <div
        className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0',
          color ?? 'bg-[--azul-correnteza]'
        )}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-sm text-[--neutro-900] group-hover:text-[--azul-correnteza] transition-colors leading-snug">
          {title}
        </p>
        {description && (
          <p className="text-xs text-[--neutro-600] mt-0.5 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}

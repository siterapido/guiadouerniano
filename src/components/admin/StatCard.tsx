import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  danger?: boolean;
  href?: string;
}

export function StatCard({ title, value, icon, danger, href }: StatCardProps) {
  const content = (
    <div
      className={cn(
        'bg-white rounded-xl border p-5 flex items-center gap-4 transition-shadow',
        danger && Number(value) > 0
          ? 'border-vermelho-luta shadow-sm shadow-red-100'
          : 'border-neutro-200',
        href && 'hover:shadow-md cursor-pointer'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          danger && Number(value) > 0 ? 'bg-red-100 text-vermelho-luta' : 'bg-azul-claro text-azul-correnteza'
        )}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-neutro-600 truncate">{title}</p>
        <p
          className={cn(
            'text-3xl font-display font-bold',
            danger && Number(value) > 0 ? 'text-vermelho-luta' : 'text-neutro-900'
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

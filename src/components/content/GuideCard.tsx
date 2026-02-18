import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GuideCardProps {
  title: string;
  slug: string;
  icon?: string;
  color?: string;
  description?: string | null;
  postCount?: number;
  className?: string;
}

export function GuideCard({ title, slug, icon, color = '#1A5FB4', description, postCount, className }: GuideCardProps) {
  const IconComponent = icon ? (LucideIcons as Record<string, unknown>)[icon] as React.ComponentType<{ className?: string; color?: string }> : null;

  return (
    <Link
      href={`/guia/${slug}`}
      className={cn(
        'group flex items-start gap-4 p-5 bg-white rounded-xl border border-neutro-200 hover:border-azul-brilhante hover:shadow-md transition-all duration-200 no-underline',
        className
      )}
    >
      {/* Ícone */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}18` }}
      >
        {IconComponent ? (
          <IconComponent className="w-6 h-6" color={color} />
        ) : (
          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
        )}
      </div>

      {/* Texto */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-neutro-900 text-base group-hover:text-azul-correnteza transition-colors leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-neutro-600 mt-0.5 line-clamp-2">{description}</p>
        )}
        {postCount !== undefined && (
          <p className="text-xs text-neutro-600 mt-1">{postCount} artigos</p>
        )}
      </div>

      <ChevronRight className="w-5 h-5 text-neutro-400 group-hover:text-azul-correnteza transition-colors flex-shrink-0 mt-1" />
    </Link>
  );
}

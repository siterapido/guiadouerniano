import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category & { post_count?: number };
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/guia/${category.slug}`}
      className={cn(
        'flex flex-col gap-2 p-4 rounded-xl border border-[--neutro-200] bg-white',
        'hover:shadow-md hover:border-[--azul-correnteza]/30 transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]',
        'group min-h-[44px]',
        className
      )}
    >
      {category.color && (
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0"
          style={{ backgroundColor: category.color }}
          aria-hidden="true"
        >
          {category.icon ?? '📚'}
        </div>
      )}
      <div>
        <h3 className="font-semibold text-[--neutro-900] group-hover:text-[--azul-correnteza] transition-colors text-sm">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-xs text-[--neutro-600] mt-0.5 line-clamp-2">{category.description}</p>
        )}
        {category.post_count !== undefined && (
          <p className="text-xs text-[--neutro-600] mt-1">
            {category.post_count} {category.post_count === 1 ? 'artigo' : 'artigos'}
          </p>
        )}
      </div>
    </Link>
  );
}

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Você está aqui" className={cn('flex items-center gap-1 text-sm', className)}>
      <ol className="flex items-center flex-wrap gap-1">
        <li>
          <Link
            href="/"
            aria-label="Início"
            className="text-neutro-600 hover:text-azul-correnteza transition-colors"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight className="w-3.5 h-3.5 text-neutro-400" aria-hidden="true" />
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="text-neutro-600 hover:text-azul-correnteza transition-colors no-underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-neutro-900 font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SearchFormProps {
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SearchForm({ defaultValue = '', placeholder = 'Buscar no guia...', className, size = 'md' }: SearchFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = inputRef.current?.value.trim() ?? '';
    if (q) router.push(`/busca?q=${encodeURIComponent(q)}`);
  }

  const sizeStyles = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg',
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={cn('w-full relative', className)}>
      <label htmlFor="search-input" className="sr-only">{placeholder}</label>
      <Search
        className={cn('absolute left-3.5 top-1/2 -translate-y-1/2 text-[--neutro-600] pointer-events-none', size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')}
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        id="search-input"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        className={cn(
          'w-full rounded-xl border border-[--neutro-200] bg-white',
          'pl-10 pr-4 text-[--neutro-950] placeholder:text-[--neutro-600]',
          'focus:outline-none focus:ring-2 focus:ring-[--azul-correnteza] focus:border-[--azul-correnteza]',
          'transition-colors duration-150',
          sizeStyles[size]
        )}
      />
    </form>
  );
}

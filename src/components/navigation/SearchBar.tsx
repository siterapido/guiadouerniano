'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = 'Buscar no Guia do UERNIANO...',
  defaultValue = '',
  className,
  autoFocus,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query.trim());
    } else {
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  }

  function handleClear() {
    setQuery('');
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={cn('w-full', className)}>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutro-600"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          aria-label={placeholder}
          className="w-full h-12 pl-12 pr-12 rounded-xl border border-neutro-200 bg-white text-neutro-900 placeholder:text-neutro-600 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpar busca"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutro-100 transition-colors"
          >
            <X className="w-4 h-4 text-neutro-600" />
          </button>
        )}
      </div>
    </form>
  );
}

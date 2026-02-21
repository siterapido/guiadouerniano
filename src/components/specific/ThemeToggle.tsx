'use client';

import { Sun } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

// Placeholder — full theme implementation would use next-themes or similar
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Alternar tema"
      className={cn(
        'w-10 h-10 rounded-lg bg-[--neutro-100] text-[--neutro-600] flex items-center justify-center',
        'hover:bg-[--neutro-200] transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]',
        className
      )}
    >
      <Sun className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}

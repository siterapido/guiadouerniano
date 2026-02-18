'use client';

import { cn } from '@/lib/utils/cn';

interface FilterChip {
  id: string;
  label: string;
  count?: number;
}

interface FilterChipsProps {
  chips: FilterChip[];
  activeId?: string | null;
  onSelect: (id: string | null) => void;
  className?: string;
}

export function FilterChips({ chips, activeId, onSelect, className }: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filtros"
      className={cn('flex gap-2 overflow-x-auto pb-2 scrollbar-hide', className)}
    >
      <button
        onClick={() => onSelect(null)}
        aria-pressed={activeId === null}
        className={cn(
          'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border-1.5 transition-colors min-h-[36px] whitespace-nowrap',
          activeId === null
            ? 'bg-azul-correnteza text-white border-azul-correnteza'
            : 'bg-white text-neutro-800 border-neutro-200 hover:border-azul-correnteza hover:text-azul-correnteza'
        )}
      >
        Todos
      </button>
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onSelect(chip.id)}
          aria-pressed={activeId === chip.id}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors min-h-[36px] whitespace-nowrap gap-1.5 flex items-center',
            activeId === chip.id
              ? 'bg-azul-correnteza text-white border-azul-correnteza'
              : 'bg-white text-neutro-800 border-neutro-200 hover:border-azul-correnteza hover:text-azul-correnteza'
          )}
        >
          {chip.label}
          {chip.count !== undefined && (
            <span className={cn('text-xs rounded-full px-1.5 py-0.5', activeId === chip.id ? 'bg-white/20' : 'bg-neutro-100')}>
              {chip.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

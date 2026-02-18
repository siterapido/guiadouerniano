'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onChange, label, description, disabled, className }: SwitchProps) {
  const id = useId();

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="block text-sm font-medium text-[--neutro-900] cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-[--neutro-600] mt-0.5">{description}</p>
        )}
      </div>
      <button
        id={id}
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex items-center flex-shrink-0 w-11 h-6 rounded-full',
          'transition-colors duration-200 ease-in-out',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza] focus-visible:ring-offset-2',
          checked ? 'bg-[--azul-correnteza]' : 'bg-[--neutro-200]',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="sr-only">{label}</span>
        <span
          className={cn(
            'inline-block w-5 h-5 rounded-full bg-white shadow-sm',
            'transform transition-transform duration-200 ease-in-out',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
      </button>
    </div>
  );
}

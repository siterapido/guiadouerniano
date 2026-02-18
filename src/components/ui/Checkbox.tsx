'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="flex items-start gap-3 cursor-pointer group">
          <div className="flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={inputId}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={!!error}
              className={cn(
                'w-5 h-5 rounded border-2 cursor-pointer transition-colors duration-150',
                'text-[--azul-correnteza] border-[--neutro-200]',
                'focus:ring-2 focus:ring-[--azul-correnteza] focus:ring-offset-0',
                'checked:bg-[--azul-correnteza] checked:border-[--azul-correnteza]',
                error && 'border-[--vermelho-luta]',
                className
              )}
              {...props}
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-medium text-[--neutro-900] group-hover:text-[--azul-correnteza] transition-colors">
              {label}
            </span>
            {description && (
              <span className="block text-sm text-[--neutro-600] mt-0.5">{description}</span>
            )}
          </div>
        </label>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-[--vermelho-luta] ml-8" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
  className,
}: RadioGroupProps) {
  const errorId = `${name}-error`;

  return (
    <fieldset className={cn('w-full', className)}>
      <legend className="text-sm font-medium text-[--neutro-800] mb-2">
        {legend}
        {required && <span className="text-[--vermelho-luta] ml-1" aria-hidden="true">*</span>}
      </legend>
      <div className="space-y-2" role="radiogroup" aria-required={required} aria-describedby={error ? errorId : undefined}>
        {options.map((opt) => (
          <RadioOption
            key={opt.value}
            name={name}
            option={opt}
            checked={value === opt.value}
            onChange={onChange}
            hasError={!!error}
          />
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-[--vermelho-luta]" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

interface RadioOptionProps {
  name: string;
  option: RadioOption;
  checked: boolean;
  onChange?: (value: string) => void;
  hasError: boolean;
}

const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ name, option, checked, onChange, hasError }, ref) => {
    const id = useId();

    return (
      <label htmlFor={id} className={cn('flex items-start gap-3 cursor-pointer group', option.disabled && 'opacity-50 cursor-not-allowed')}>
        <div className="flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={option.value}
            checked={checked}
            disabled={option.disabled}
            onChange={() => onChange?.(option.value)}
            className={cn(
              'w-5 h-5 cursor-pointer transition-colors duration-150',
              'text-[--azul-correnteza] border-2 border-[--neutro-200]',
              'focus:ring-2 focus:ring-[--azul-correnteza] focus:ring-offset-0',
              hasError && 'border-[--vermelho-luta]'
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-sm font-medium text-[--neutro-900] group-hover:text-[--azul-correnteza] transition-colors">
            {option.label}
          </span>
          {option.description && (
            <span className="block text-sm text-[--neutro-600] mt-0.5">{option.description}</span>
          )}
        </div>
      </label>
    );
  }
);
RadioOption.displayName = 'RadioOption';

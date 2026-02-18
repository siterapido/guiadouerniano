import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-[--neutro-100] text-[--neutro-800] border border-[--neutro-200]',
  primary: 'bg-[--azul-correnteza]/10 text-[--azul-correnteza] border border-[--azul-correnteza]/30',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-[--vermelho-luta] border border-red-200',
};

const sizeStyles: Record<string, string> = {
  sm: 'text-xs px-2 py-1 gap-1',
  md: 'text-sm px-3 py-1.5 gap-1.5',
};

export function Chip({ label, onRemove, variant = 'default', size = 'md', className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-current transition-colors"
          aria-label={`Remover ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

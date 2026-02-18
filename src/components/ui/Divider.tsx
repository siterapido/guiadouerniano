import { cn } from '@/lib/utils/cn';

interface DividerProps {
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Divider({ label, className, orientation = 'horizontal' }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={cn('w-px bg-neutro-200 self-stretch', className)} role="separator" aria-orientation="vertical" />;
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-3', className)} role="separator">
        <div className="flex-1 h-px bg-neutro-200" />
        <span className="text-sm text-neutro-600 font-medium">{label}</span>
        <div className="flex-1 h-px bg-neutro-200" />
      </div>
    );
  }

  return <hr className={cn('border-neutro-200', className)} role="separator" />;
}

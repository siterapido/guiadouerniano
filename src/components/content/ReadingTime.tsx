import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ReadingTimeProps {
  minutes: number;
  className?: string;
  showIcon?: boolean;
}

export function ReadingTime({ minutes, className, showIcon = true }: ReadingTimeProps) {
  const label = minutes <= 1 ? '1 min de leitura' : `${minutes} min de leitura`;

  return (
    <span className={cn('inline-flex items-center gap-1 text-sm text-[--neutro-600]', className)}>
      {showIcon && <Clock className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
}

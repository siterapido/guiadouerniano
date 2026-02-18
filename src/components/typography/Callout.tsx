import { cn } from '@/lib/utils/cn';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

type CalloutVariant = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const configs: Record<CalloutVariant, { icon: React.ElementType; styles: string; iconColor: string }> = {
  info: { icon: Info, styles: 'bg-blue-50 border-l-4 border-[--azul-correnteza]', iconColor: 'text-[--azul-correnteza]' },
  warning: { icon: AlertTriangle, styles: 'bg-amber-50 border-l-4 border-amber-400', iconColor: 'text-amber-600' },
  success: { icon: CheckCircle, styles: 'bg-green-50 border-l-4 border-green-500', iconColor: 'text-green-600' },
  error: { icon: XCircle, styles: 'bg-red-50 border-l-4 border-[--vermelho-luta]', iconColor: 'text-[--vermelho-luta]' },
  tip: { icon: Lightbulb, styles: 'bg-purple-50 border-l-4 border-purple-400', iconColor: 'text-purple-600' },
};

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const { icon: Icon, styles, iconColor } = configs[variant];

  return (
    <div className={cn('rounded-r-lg p-4 my-4', styles, className)} role={variant === 'warning' || variant === 'error' ? 'alert' : 'note'}>
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColor)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold text-[--neutro-900] mb-1">{title}</p>}
          <div className="text-sm text-[--neutro-800] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

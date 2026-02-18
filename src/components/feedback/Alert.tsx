import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variantMap = {
  info:    { Icon: Info,          bg: 'bg-blue-50',   border: 'border-info',    icon: 'text-info',    title: 'text-blue-900' },
  success: { Icon: CheckCircle,   bg: 'bg-green-50',  border: 'border-sucesso', icon: 'text-sucesso', title: 'text-green-900' },
  warning: { Icon: AlertTriangle, bg: 'bg-amber-50',  border: 'border-aviso',   icon: 'text-aviso',   title: 'text-amber-900' },
  error:   { Icon: AlertCircle,   bg: 'bg-red-50',    border: 'border-erro',    icon: 'text-erro',    title: 'text-red-900' },
};

export function Alert({ variant = 'info', title, children, onDismiss, className }: AlertProps) {
  const { Icon, bg, border, icon, title: titleColor } = variantMap[variant];

  return (
    <div
      role="alert"
      className={cn('flex gap-3 p-4 rounded-xl border', bg, border, className)}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', icon)} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className={cn('font-semibold text-sm mb-1', titleColor)}>{title}</p>}
        <div className="text-sm text-neutro-800">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Fechar"
          className="flex-shrink-0 p-1 rounded hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4 text-neutro-600" />
        </button>
      )}
    </div>
  );
}

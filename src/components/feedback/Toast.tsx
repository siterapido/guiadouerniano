'use client';

import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToastStore } from '@/stores/toast';
import { cn } from '@/lib/utils/cn';

const variantMap = {
  success: { Icon: CheckCircle,   bg: 'bg-neutro-900', bar: 'bg-sucesso' },
  error:   { Icon: AlertCircle,   bg: 'bg-neutro-900', bar: 'bg-erro' },
  info:    { Icon: Info,           bg: 'bg-neutro-900', bar: 'bg-info' },
  warning: { Icon: AlertTriangle, bg: 'bg-neutro-900', bar: 'bg-aviso' },
};

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  if (!toasts.length) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-tooltip flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((toast) => {
        const { Icon, bg, bar } = variantMap[toast.variant];
        return (
          <div
            key={toast.id}
            role="status"
            className={cn(
              'flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl pointer-events-auto max-w-sm ml-auto animate-slide-up overflow-hidden relative',
              bg
            )}
          >
            <div className={cn('absolute left-0 top-0 bottom-0 w-1', bar)} />
            <Icon className="w-5 h-5 text-white flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-white text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => remove(toast.id)}
              aria-label="Fechar notificação"
              className="text-white/60 hover:text-white transition-colors p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

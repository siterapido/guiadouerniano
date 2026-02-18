import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}>
      {icon && (
        <div className="w-20 h-20 rounded-full bg-neutro-100 flex items-center justify-center text-neutro-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-display font-bold text-heading-md text-neutro-900 mb-2">{title}</h3>
      {description && <p className="text-body-sm text-neutro-600 max-w-sm mb-6">{description}</p>}
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

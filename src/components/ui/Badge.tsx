import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full text-xs font-semibold uppercase tracking-wide px-3 py-1',
  {
    variants: {
      variant: {
        primary:  'bg-azul-claro text-azul-correnteza',
        danger:   'bg-red-100 text-vermelho-luta',
        success:  'bg-green-100 text-sucesso',
        warning:  'bg-amber-100 text-aviso',
        orange:   'bg-orange-100 text-laranja-energia',
        dark:     'bg-neutro-900 text-white',
        outline:  'border border-neutro-400 text-neutro-800 bg-transparent',
        urgente:  'bg-vermelho-luta text-white',
      },
    },
    defaultVariants: { variant: 'primary' },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

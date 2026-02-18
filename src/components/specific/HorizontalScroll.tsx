import { cn } from '@/lib/utils/cn';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const gapStyles = { sm: 'gap-2', md: 'gap-3', lg: 'gap-4' };

export function HorizontalScroll({ children, className, gap = 'md' }: HorizontalScrollProps) {
  return (
    <div
      className={cn(
        'flex overflow-x-auto pb-3 -mb-3 scrollbar-none snap-x snap-mandatory',
        gapStyles[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

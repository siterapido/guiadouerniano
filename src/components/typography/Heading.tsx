import { cn } from '@/lib/utils/cn';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

interface HeadingProps {
  level?: HeadingLevel;
  size?: HeadingSize;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: 'text-sm font-semibold',
  sm: 'text-base font-semibold',
  md: 'text-lg font-bold',
  lg: 'text-xl font-bold',
  xl: 'text-2xl font-bold',
  '2xl': 'text-3xl font-bold',
  '3xl': 'text-4xl font-extrabold',
};

const defaultSizeByLevel: Record<HeadingLevel, HeadingSize> = {
  1: '3xl',
  2: '2xl',
  3: 'xl',
  4: 'lg',
  5: 'md',
  6: 'sm',
};

export function Heading({ level = 2, size, children, className, id }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const resolvedSize = size ?? defaultSizeByLevel[level];

  return (
    <Tag
      id={id}
      className={cn(
        'font-display text-[--neutro-950] leading-tight tracking-tight',
        sizeStyles[resolvedSize],
        className
      )}
    >
      {children}
    </Tag>
  );
}

import { cn } from '@/lib/utils/cn';
import { CategoryCard } from '@/components/content/CategoryCard';
import type { Category } from '@/types';

interface CategoryGridProps {
  categories: (Category & { post_count?: number })[];
  className?: string;
}

export function CategoryGrid({ categories, className }: CategoryGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4', className)}>
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}

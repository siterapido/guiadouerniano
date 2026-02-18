'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, BookOpen, Megaphone, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { bottomNavItems } from '@/config/navigation';

const iconMap = { Home, Search, BookOpen, Megaphone, User } as const;

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed bottom-0 left-0 right-0 z-fixed bg-white border-t border-neutro-200 safe-area-pb"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex justify-around items-center h-16">
        {bottomNavItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Home;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] min-h-[44px]',
                isActive
                  ? 'text-azul-correnteza'
                  : 'text-neutro-600 hover:text-neutro-900'
              )}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

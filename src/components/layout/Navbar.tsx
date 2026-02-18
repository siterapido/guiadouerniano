'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';
import { siteConfig } from '@/config/site';

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string | null;
  userAvatar?: string | null;
}

export function Navbar({ isAuthenticated, userName, userAvatar }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="hidden md:block sticky top-0 z-sticky bg-white border-b border-neutro-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 no-underline flex-shrink-0">
          <span className="font-display font-bold text-xl text-azul-uern">Guia do</span>
          <span className="font-display font-extrabold text-xl text-azul-correnteza">UERNIANO</span>
        </Link>

        {/* Nav Links */}
        <nav aria-label="Navegação desktop" className="flex items-center gap-1 flex-1">
          {siteConfig.nav.main.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline min-h-[44px] flex items-center',
                  isActive
                    ? 'text-azul-correnteza bg-azul-claro'
                    : 'text-neutro-800 hover:text-azul-correnteza hover:bg-azul-claro'
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Busca + Auth */}
        <div className="flex items-center gap-3">
          <Link
            href="/busca"
            aria-label="Buscar"
            className="p-2 rounded-full text-neutro-600 hover:text-azul-correnteza hover:bg-azul-claro transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <Search className="w-5 h-5" />
          </Link>
          {isAuthenticated ? (
            <Link href="/membros" className="flex items-center gap-2 no-underline group">
              <Avatar src={userAvatar} name={userName} size="sm" />
              <span className="text-sm font-medium text-neutro-800 group-hover:text-azul-correnteza hidden lg:block">
                {userName?.split(' ')[0]}
              </span>
            </Link>
          ) : (
            <Button variant="primary" size="sm">
              <Link href="/login" className="no-underline text-white">
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { Bell, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils/cn';

interface TopAppBarProps {
  onMenuClick?: () => void;
  userAvatar?: string | null;
  userName?: string | null;
  notificationCount?: number;
  className?: string;
  variant?: 'brand' | 'white';
}

export function TopAppBar({
  onMenuClick,
  userAvatar,
  userName,
  notificationCount = 0,
  className,
  variant = 'white',
}: TopAppBarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-sticky flex items-center justify-between px-4 h-14',
        variant === 'brand'
          ? 'bg-azul-uern text-white shadow-md'
          : 'bg-white text-neutro-900 border-b border-neutro-200 shadow-sm',
        className
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span
          className={cn(
            'font-display font-bold text-lg leading-none',
            variant === 'brand' ? 'text-white' : 'text-azul-uern'
          )}
        >
          Guia do
        </span>
        <span
          className={cn(
            'font-display font-extrabold text-lg leading-none',
            variant === 'brand' ? 'text-white' : 'text-azul-correnteza'
          )}
        >
          UERNIANO
        </span>
      </Link>

      {/* Ações */}
      <div className="flex items-center gap-1">
        {/* Notificações */}
        <button
          aria-label={`${notificationCount} notificações`}
          className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-vermelho-luta text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* Avatar / Menu */}
        <Link
          href="/membros"
          aria-label="Meu perfil"
          className="p-1 rounded-full hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Avatar src={userAvatar} name={userName} size="sm" />
        </Link>
      </div>
    </header>
  );
}

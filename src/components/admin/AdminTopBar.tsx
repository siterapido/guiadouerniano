'use client';

import { Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

interface AdminTopBarProps {
  onMenuOpen: () => void;
  breadcrumb?: string;
  userName: string | null;
  userAvatar: string | null | undefined;
}

export function AdminTopBar({ onMenuOpen, breadcrumb, userName, userAvatar }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutro-200 h-14 flex items-center px-4 gap-3">
      <button
        onClick={onMenuOpen}
        className="lg:hidden p-2 rounded-lg hover:bg-neutro-100 text-neutro-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      <div className="flex-1 min-w-0">
        {breadcrumb && (
          <p className="text-sm font-medium text-neutro-700 truncate">{breadcrumb}</p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Avatar src={userAvatar} name={userName ?? 'Admin'} size="sm" />
        <span className="hidden sm:block text-sm font-medium text-neutro-800 max-w-[120px] truncate">
          {userName ?? 'Admin'}
        </span>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Tag,
  FolderOpen,
  Users,
  MessageSquare,
  Flag,
  X,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  pendingComments?: number;
  openReports?: number;
}

export function AdminSidebar({
  isOpen,
  onClose,
  pendingComments = 0,
  openReports = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sections: NavSection[] = [
    {
      title: 'CONTEÚDO',
      items: [
        { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
        { label: 'Posts', href: '/admin/posts', icon: <FileText size={18} /> },
        { label: 'Eventos', href: '/admin/eventos', icon: <Calendar size={18} /> },
        { label: 'Categorias', href: '/admin/categorias', icon: <Tag size={18} /> },
      ],
    },
    {
      title: 'MEMBROS',
      items: [
        { label: 'Usuários', href: '/admin/usuarios', icon: <Users size={18} /> },
        { label: 'Materiais', href: '/admin/materiais', icon: <FolderOpen size={18} /> },
      ],
    },
    {
      title: 'MODERAÇÃO',
      items: [
        {
          label: 'Comentários',
          href: '/admin/comentarios',
          icon: <MessageSquare size={18} />,
          badge: pendingComments,
        },
        {
          label: 'Denúncias',
          href: '/admin/denuncias',
          icon: <Flag size={18} />,
          badge: openReports,
        },
      ],
    },
  ];

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const sidebarContent = (
    <nav className="h-full flex flex-col py-4 overflow-y-auto" aria-label="Navegação do painel admin">
      <div className="px-4 mb-6 flex items-center justify-between">
        <Link href="/admin" className="font-display font-bold text-lg text-azul-uern no-underline">
          <span className="text-vermelho-luta">Admin</span> Correnteza
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-neutro-100 text-neutro-600"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 px-3 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 mb-1.5 text-xs font-bold text-neutro-600 tracking-widest">
              {section.title}
            </p>
            <ul className="space-y-0.5" role="list">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors no-underline',
                      isActive(item.href)
                        ? 'bg-azul-claro text-azul-correnteza font-semibold'
                        : 'text-neutro-800 hover:bg-neutro-100'
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-vermelho-luta text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="px-4 pt-4 border-t border-neutro-200">
        <Link
          href="/"
          className="text-xs text-neutro-600 hover:text-azul-correnteza no-underline transition-colors"
        >
          ← Voltar ao site
        </Link>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 border-r border-neutro-200 bg-white min-h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative flex flex-col w-64 bg-white shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

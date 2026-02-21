import { getDashboardStats } from '@/lib/queries/admin/getDashboardStats';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Calendar,
  Users,
  MessageSquare,
  Flag,
  Pencil,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  published: 'Publicado',
  archived: 'Arquivado',
};

const statusVariants: Record<string, 'outline' | 'primary' | 'dark'> = {
  draft: 'outline',
  published: 'primary',
  archived: 'dark',
};

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  type RecentPost = (typeof stats.recentPosts)[number];

  const columns: Column<RecentPost>[] = [
    {
      key: 'title',
      header: 'Título',
      render: (row) => (
        <span className="font-medium text-neutro-900 line-clamp-1">{row.title}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={statusVariants[row.status] ?? 'outline'}>
          {statusLabels[row.status] ?? row.status}
        </Badge>
      ),
      hideOnMobile: true,
    },
    {
      key: 'author',
      header: 'Autor',
      render: (row) => (
        <span className="text-neutro-600 text-sm">{row.author_name ?? '—'}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'date',
      header: 'Data',
      render: (row) => (
        <span className="text-neutro-600 text-sm">
          {new Date(row.created_at).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Link
          href={`/admin/posts/${row.id}/editar`}
          className="inline-flex items-center gap-1 text-azul-correnteza text-sm hover:underline no-underline"
        >
          <Pencil size={14} />
          Editar
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Dashboard</h1>
        <p className="text-neutro-600 text-sm mt-1">
          Visão geral do conteúdo e atividade recente
        </p>
      </div>

      {/* Row 1 — Main stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Posts publicados"
          value={stats.publishedPosts}
          icon={<FileText size={22} />}
          href="/admin/posts?status=published"
        />
        <StatCard
          title="Rascunhos"
          value={stats.draftPosts}
          icon={<BookOpen size={22} />}
          href="/admin/posts?status=draft"
        />
        <StatCard
          title="Próximos eventos"
          value={stats.upcomingEvents}
          icon={<Calendar size={22} />}
          href="/admin/eventos"
        />
        <StatCard
          title="Usuários ativos"
          value={stats.totalUsers}
          icon={<Users size={22} />}
          href="/admin/usuarios"
        />
      </div>

      {/* Row 2 — Alert stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          title="Comentários pendentes"
          value={stats.pendingComments}
          icon={<MessageSquare size={22} />}
          danger
          href="/admin/comentarios"
        />
        <StatCard
          title="Denúncias abertas"
          value={stats.openReports}
          icon={<Flag size={22} />}
          danger
          href="/admin/denuncias"
        />
      </div>

      {/* Row 3 — Recent posts table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg text-neutro-900">Posts recentes</h2>
          <Link href="/admin/posts" className="text-sm text-azul-correnteza hover:underline no-underline">
            Ver todos →
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={stats.recentPosts}
          getKey={(row) => row.id}
          emptyMessage="Nenhum post encontrado."
        />
      </div>
    </div>
  );
}

import { getAdminPosts } from '@/lib/queries/admin/getAdminPosts';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import type { AdminPost } from '@/lib/queries/admin/getAdminPosts';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Posts' };

const statusVariants: Record<string, 'outline' | 'primary' | 'dark'> = {
  draft: 'outline',
  published: 'primary',
  archived: 'dark',
};

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  published: 'Publicado',
  archived: 'Arquivado',
};

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  guide: 'Guia',
};

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: { status?: string; type?: string; q?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const { data: posts, count } = await getAdminPosts({
    search: searchParams.q,
    status: searchParams.status,
    type: searchParams.type,
    page,
    pageSize: 20,
  });

  const columns: Column<AdminPost>[] = [
    {
      key: 'title',
      header: 'Título',
      render: (row) => (
        <span className="font-medium text-neutro-900 line-clamp-1 max-w-xs">{row.title}</span>
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      render: (row) => (
        <span className="text-neutro-600 text-sm">{typeLabels[row.type] ?? row.type}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={statusVariants[row.status] ?? 'outline'}>
          {statusLabels[row.status] ?? row.status}
        </Badge>
      ),
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
      hideOnMobile: true,
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
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-neutro-900">Posts</h1>
          <p className="text-sm text-neutro-600 mt-0.5">{count} no total</p>
        </div>
        <Link
          href="/admin/posts/novo"
          className="inline-flex items-center gap-2 bg-azul-correnteza text-white font-semibold text-sm rounded-md h-10 px-4 hover:bg-azul-uern transition-colors no-underline"
        >
          <Plus size={16} />
          Novo post
        </Link>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3">
        <select
          name="status"
          defaultValue={searchParams.status ?? ''}
          className="h-10 px-3 rounded-md border border-neutro-200 text-sm text-neutro-900 bg-white focus:outline-none focus:border-azul-correnteza"
          onChange={(e) => (e.target.form as HTMLFormElement).submit()}
        >
          <option value="">Todos os status</option>
          <option value="draft">Rascunho</option>
          <option value="published">Publicado</option>
          <option value="archived">Arquivado</option>
        </select>
        <select
          name="type"
          defaultValue={searchParams.type ?? ''}
          className="h-10 px-3 rounded-md border border-neutro-200 text-sm text-neutro-900 bg-white focus:outline-none focus:border-azul-correnteza"
          onChange={(e) => (e.target.form as HTMLFormElement).submit()}
        >
          <option value="">Todos os tipos</option>
          <option value="blog">Blog</option>
          <option value="guide">Guia</option>
        </select>
        <input
          type="search"
          name="q"
          defaultValue={searchParams.q ?? ''}
          placeholder="Buscar por título..."
          className="h-10 px-4 rounded-md border border-neutro-200 text-sm text-neutro-900 bg-white focus:outline-none focus:border-azul-correnteza flex-1 min-w-[180px]"
        />
        <button
          type="submit"
          className="h-10 px-4 rounded-md bg-azul-correnteza text-white text-sm font-medium hover:bg-azul-uern transition-colors"
        >
          Filtrar
        </button>
      </form>

      <DataTable
        columns={columns}
        data={posts}
        getKey={(row) => row.id}
        emptyMessage="Nenhum post encontrado."
      />

      {/* Pagination */}
      {count > 20 && (
        <div className="flex items-center justify-between text-sm text-neutro-600">
          <span>
            Página {page} de {Math.ceil(count / 20)}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={`?page=${page - 1}`}
                className="px-3 py-1.5 rounded border border-neutro-200 hover:bg-neutro-100 no-underline text-neutro-800"
              >
                Anterior
              </Link>
            )}
            {page < Math.ceil(count / 20) && (
              <Link
                href={`?page=${page + 1}`}
                className="px-3 py-1.5 rounded border border-neutro-200 hover:bg-neutro-100 no-underline text-neutro-800"
              >
                Próxima
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

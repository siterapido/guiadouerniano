import { getAdminEvents } from '@/lib/queries/admin/getAdminEvents';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import type { AdminEvent } from '@/lib/queries/admin/getAdminEvents';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Eventos' };

const statusVariants: Record<string, 'primary' | 'outline' | 'dark' | 'danger'> = {
  upcoming: 'primary',
  ongoing: 'success' as 'primary',
  past: 'dark',
  cancelled: 'danger',
};

const statusLabels: Record<string, string> = {
  upcoming: 'Próximo',
  ongoing: 'Em andamento',
  past: 'Encerrado',
  cancelled: 'Cancelado',
};

export default async function AdminEventosPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const { data: events, count } = await getAdminEvents({
    status: searchParams.status,
    page,
    pageSize: 20,
  });

  const columns: Column<AdminEvent>[] = [
    {
      key: 'title',
      header: 'Título',
      render: (row) => (
        <span className="font-medium text-neutro-900 line-clamp-1 max-w-xs">{row.title}</span>
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
    },
    {
      key: 'campus',
      header: 'Campus',
      render: (row) => (
        <span className="text-neutro-600 text-sm capitalize">{row.campus ?? '—'}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'starts_at',
      header: 'Início',
      render: (row) => (
        <span className="text-neutro-600 text-sm">
          {new Date(row.starts_at).toLocaleDateString('pt-BR')}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <Link
          href={`/admin/eventos/${row.id}/editar`}
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
          <h1 className="font-display font-bold text-2xl text-neutro-900">Eventos</h1>
          <p className="text-sm text-neutro-600 mt-0.5">{count} no total</p>
        </div>
        <Link
          href="/admin/eventos/novo"
          className="inline-flex items-center gap-2 bg-azul-correnteza text-white font-semibold text-sm rounded-md h-10 px-4 hover:bg-azul-uern transition-colors no-underline"
        >
          <Plus size={16} />
          Novo evento
        </Link>
      </div>

      <form method="GET" className="flex flex-wrap gap-3">
        <select
          name="status"
          defaultValue={searchParams.status ?? ''}
          className="h-10 px-3 rounded-md border border-neutro-200 text-sm text-neutro-900 bg-white focus:outline-none focus:border-azul-correnteza"
          onChange={(e) => (e.target.form as HTMLFormElement).submit()}
        >
          <option value="">Todos os status</option>
          <option value="upcoming">Próximos</option>
          <option value="ongoing">Em andamento</option>
          <option value="past">Encerrados</option>
          <option value="cancelled">Cancelados</option>
        </select>
        <button
          type="submit"
          className="h-10 px-4 rounded-md bg-azul-correnteza text-white text-sm font-medium hover:bg-azul-uern transition-colors"
        >
          Filtrar
        </button>
      </form>

      <DataTable
        columns={columns}
        data={events}
        getKey={(row) => row.id}
        emptyMessage="Nenhum evento encontrado."
      />
    </div>
  );
}

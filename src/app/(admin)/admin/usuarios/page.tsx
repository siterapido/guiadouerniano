import { getAdminUsers } from '@/lib/queries/admin/getAdminUsers';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { RoleBadge } from '@/components/admin/RoleBadge';
import { UserActions } from './UserActions';
import type { AdminUser } from '@/lib/queries/admin/getAdminUsers';
import type { UserRole } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Usuários' };

export default async function AdminUsuariosPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const { data: users, count } = await getAdminUsers({ page, pageSize: 30 });

  const columns: Column<AdminUser>[] = [
    {
      key: 'name',
      header: 'Usuário',
      render: (row) => (
        <div>
          <p className="font-medium text-neutro-900">{row.name ?? '—'}</p>
          <p className="text-xs text-neutro-600">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Papel',
      render: (row) => <RoleBadge role={row.role as UserRole} />,
    },
    {
      key: 'campus',
      header: 'Campus',
      render: (row) => (
        <span className="text-sm text-neutro-600 capitalize">{row.campus ?? '—'}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span
          className={`text-sm font-medium ${row.is_active ? 'text-sucesso' : 'text-neutro-600'}`}
        >
          {row.is_active ? 'Ativo' : 'Inativo'}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'actions',
      header: 'Ações',
      render: (row) => <UserActions user={row} />,
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Usuários</h1>
        <p className="text-sm text-neutro-600 mt-0.5">{count} cadastrados</p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        getKey={(row) => row.id}
        emptyMessage="Nenhum usuário encontrado."
      />
    </div>
  );
}

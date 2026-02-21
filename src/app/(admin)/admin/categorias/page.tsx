import { supabaseAdmin } from '@/lib/supabase/admin';
import { AdminCategoryForm } from '@/components/admin/AdminCategoryForm';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Categorias' };

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  post_type: string;
  order_index: number;
  is_active: boolean;
}

const typeLabels: Record<string, string> = {
  blog: 'Blog',
  guide: 'Guia',
};

export default async function AdminCategoriasPage() {
  const { data: categories } = await supabaseAdmin
    .from('categories')
    .select('id, name, slug, post_type, order_index, is_active')
    .order('post_type')
    .order('order_index');

  const rows = (categories ?? []) as CategoryRow[];

  const columns: Column<CategoryRow>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (row) => (
        <span className="font-medium text-neutro-900">{row.name}</span>
      ),
    },
    {
      key: 'slug',
      header: 'Slug',
      render: (row) => (
        <code className="text-xs bg-neutro-100 px-1.5 py-0.5 rounded text-neutro-700">
          {row.slug}
        </code>
      ),
      hideOnMobile: true,
    },
    {
      key: 'type',
      header: 'Tipo',
      render: (row) => (
        <span className="text-sm text-neutro-600">{typeLabels[row.post_type] ?? row.post_type}</span>
      ),
    },
    {
      key: 'order',
      header: 'Ordem',
      render: (row) => (
        <span className="text-sm text-neutro-600">{row.order_index}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.is_active ? 'primary' : 'outline'}>
          {row.is_active ? 'Ativa' : 'Inativa'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Categorias</h1>
        <p className="text-sm text-neutro-600 mt-1">{rows.length} categorias</p>
      </div>

      <AdminCategoryForm />

      <DataTable
        columns={columns}
        data={rows}
        getKey={(row) => row.id}
        emptyMessage="Nenhuma categoria encontrada."
      />
    </div>
  );
}

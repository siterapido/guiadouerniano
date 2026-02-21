import { supabaseAdmin } from '@/lib/supabase/admin';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Plus, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Materiais' };

interface MaterialRow {
  id: string;
  title: string;
  file_type: string;
  category: string | null;
  is_public: boolean;
  downloads_count: number;
  created_at: string;
}

const typeVariants: Record<string, 'primary' | 'danger' | 'warning' | 'orange' | 'dark'> = {
  pdf: 'danger',
  video: 'orange',
  link: 'primary',
  image: 'warning',
  doc: 'dark',
};

export default async function AdminMateriaisPage() {
  const { data: materials } = await supabaseAdmin
    .from('materials')
    .select('id, title, file_type, file_url, category, is_public, downloads_count, created_at')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  const rows = (materials ?? []) as (MaterialRow & { file_url: string })[];

  const columns: Column<MaterialRow & { file_url: string }>[] = [
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
        <Badge variant={typeVariants[row.file_type] ?? 'outline'}>
          {row.file_type.toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'category',
      header: 'Categoria',
      render: (row) => (
        <span className="text-sm text-neutro-600">{row.category ?? '—'}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'visibility',
      header: 'Visível',
      render: (row) => (
        <Badge variant={row.is_public ? 'success' as 'primary' : 'outline'}>
          {row.is_public ? 'Público' : 'Membros'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <a
          href={row.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-azul-correnteza text-sm hover:underline no-underline"
        >
          <ExternalLink size={14} />
          Abrir
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-neutro-900">Materiais</h1>
          <p className="text-sm text-neutro-600 mt-0.5">{rows.length} materiais</p>
        </div>
        <Link
          href="/admin/materiais/novo"
          className="inline-flex items-center gap-2 bg-azul-correnteza text-white font-semibold text-sm rounded-md h-10 px-4 hover:bg-azul-uern transition-colors no-underline"
        >
          <Plus size={16} />
          Adicionar
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={rows}
        getKey={(row) => row.id}
        emptyMessage="Nenhum material cadastrado."
      />
    </div>
  );
}

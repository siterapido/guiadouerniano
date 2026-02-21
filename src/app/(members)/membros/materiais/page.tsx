import { redirect } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Badge } from '@/components/ui/Badge';
import { getUser } from '@/lib/supabase/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { formatFileSize } from '@/lib/utils/format';
import { FileText, Download } from 'lucide-react';
import type { Metadata } from 'next';
import type { Material } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Materiais — Área de Membros',
  robots: 'noindex',
};

export default async function MateriaisPage() {
  const user = await getUser();
  if (!user) redirect('/login?redirect=/membros/materiais');

  const supabase = await createSupabaseServerClient();
  const { data: materials } = await supabase
    .from('materials')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  const typedMaterials = (materials ?? []) as Material[];

  return (
    <PageLayout isAuthenticated>
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: 'Área do Membro', href: '/membros' }, { label: 'Materiais' }]}
          className="mb-6"
        />
        <h1 className="font-display font-bold text-heading-xl text-neutro-900 mb-8">
          Materiais Exclusivos
        </h1>

        {typedMaterials.length === 0 ? (
          <EmptyState
            title="Nenhum material disponível"
            description="Os materiais serão publicados em breve."
            icon={<FileText className="w-8 h-8" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {typedMaterials.map((material) => (
              <a
                key={material.id}
                href={material.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-xl border border-neutro-200 p-5 hover:border-azul-correnteza hover:shadow-md transition-all no-underline"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-azul-claro flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-azul-correnteza" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-neutro-900 text-sm group-hover:text-azul-correnteza transition-colors line-clamp-2">
                      {material.title}
                    </h3>
                    {material.description && (
                      <p className="text-xs text-neutro-600 mt-1 line-clamp-2">{material.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="primary" className="text-[10px]">
                        {material.file_type.toUpperCase()}
                      </Badge>
                      {material.file_size && (
                        <span className="text-xs text-neutro-600">{formatFileSize(material.file_size)}</span>
                      )}
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-neutro-400 group-hover:text-azul-correnteza transition-colors flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

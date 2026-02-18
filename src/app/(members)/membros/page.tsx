import { redirect } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/feedback/Alert';
import { getUser } from '@/lib/supabase/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import type { Profile } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Área do Membro',
  robots: 'noindex',
};

export default async function MembrosPage() {
  const user = await getUser();
  if (!user) redirect('/login?redirect=/membros');

  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const typedProfile = profile as Profile | null;

  const roleLabels: Record<string, string> = {
    student: 'Estudante',
    member: 'Membro',
    editor: 'Editor',
    admin: 'Administrador',
  };

  return (
    <PageLayout isAuthenticated userName={typedProfile?.name} userAvatar={typedProfile?.avatar_url}>
      <Container className="py-8 max-w-2xl">
        <h1 className="font-display font-bold text-heading-xl text-neutro-900 mb-6">
          Área do Membro
        </h1>

        {/* Perfil */}
        <div className="bg-gradient-to-br from-azul-uern to-azul-correnteza rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center gap-4">
            <Avatar
              src={typedProfile?.avatar_url}
              name={typedProfile?.name ?? user.email}
              size="xl"
              className="border-2 border-white/30"
            />
            <div>
              <h2 className="font-display font-bold text-2xl">
                {typedProfile?.name ?? 'Estudante'}
              </h2>
              <p className="text-white/70 text-sm">{user.email}</p>
              {typedProfile?.campus && (
                <p className="text-white/70 text-sm capitalize mt-1">{typedProfile.campus}</p>
              )}
              <Badge variant="dark" className="mt-2">
                {roleLabels[typedProfile?.role ?? 'student']}
              </Badge>
            </div>
          </div>
        </div>

        {/* Conteúdo baseado em role */}
        {typedProfile?.role === 'student' && (
          <Alert variant="info" title="Quer acessar materiais exclusivos?">
            Entre em contato com o Movimento Correnteza para se tornar membro e acessar materiais,
            eventos exclusivos e mais recursos.
          </Alert>
        )}

        {typedProfile?.role && ['member', 'editor', 'admin'].includes(typedProfile.role) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/membros/materiais"
              className="block p-5 bg-white rounded-xl border border-neutro-200 hover:border-azul-correnteza hover:shadow-md transition-all no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-azul-claro flex items-center justify-center mb-3">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="font-display font-bold text-neutro-900">Materiais</h3>
              <p className="text-sm text-neutro-600 mt-1">Documentos e materiais exclusivos</p>
            </a>

            <a
              href="/eventos"
              className="block p-5 bg-white rounded-xl border border-neutro-200 hover:border-azul-correnteza hover:shadow-md transition-all no-underline"
            >
              <div className="w-12 h-12 rounded-xl bg-azul-claro flex items-center justify-center mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-display font-bold text-neutro-900">Eventos</h3>
              <p className="text-sm text-neutro-600 mt-1">Próximos eventos do movimento</p>
            </a>
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

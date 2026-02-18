import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/content/ArticleCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { getPosts } from '@/lib/queries/getPosts';
import { Megaphone } from 'lucide-react';
import type { Metadata } from 'next';
import type { PostWithAuthor } from '@/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Movimento Correnteza',
  description: 'Conheça o Movimento Correnteza — organização estudantil da UERN comprometida com a democratização da universidade.',
};

export default async function MovimentoPage() {
  const posts = await getPosts({ type: 'blog', limit: 6 });

  return (
    <PageLayout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-azul-uern via-azul-correnteza to-vermelho-luta py-16 text-white">
        <Container size="lg" className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Megaphone className="w-5 h-5" />
            <span className="text-sm font-semibold">Movimento Estudantil</span>
          </div>
          <h1 className="font-display font-extrabold text-display-xl mb-4">
            Movimento Correnteza
          </h1>
          <p className="text-white/80 text-body-lg max-w-2xl mx-auto">
            Uma organização estudantil comprometida com a democratização da universidade,
            a defesa do ensino público e a construção de uma comunidade unida e combativa.
          </p>
        </Container>
      </div>

      <Container className="py-12">
        {/* Valores */}
        <section className="mb-16">
          <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-8 text-center">
            Nossos valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: '✊', title: 'Combatividade', desc: 'Não nos calar diante das injustiças. Lutar por melhores condições para todos os estudantes.' },
              { emoji: '🤝', title: 'Solidariedade', desc: 'Construir uma universidade mais acolhedora, que cuida de quem chega.' },
              { emoji: '📚', title: 'Educação de qualidade', desc: 'Defender o ensino público, gratuito e de qualidade como direito fundamental.' },
            ].map((v) => (
              <div key={v.title} className="text-center p-6 bg-white rounded-xl border border-neutro-200">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h3 className="font-display font-bold text-heading-sm text-neutro-900 mb-2">{v.title}</h3>
                <p className="text-body-sm text-neutro-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Últimas publicações */}
        {posts.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-6">
              Últimas publicações
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post as PostWithAuthor} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </PageLayout>
  );
}

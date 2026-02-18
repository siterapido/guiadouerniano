import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { ArticleCard } from '@/components/content/ArticleCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { getCategoryBySlug } from '@/lib/queries/getCategories';
import { getPosts } from '@/lib/queries/getPosts';
import { BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import type { PostWithAuthor } from '@/types';

interface GuiaCategoriaPageProps {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: GuiaCategoriaPageProps): Promise<Metadata> {
  const { categoria } = await params;
  const cat = await getCategoryBySlug(categoria);
  if (!cat) return { title: 'Categoria não encontrada' };
  return { title: cat.name, description: cat.description ?? undefined };
}

export default async function GuiaCategoriaPage({ params }: GuiaCategoriaPageProps) {
  const { categoria } = await params;
  const cat = await getCategoryBySlug(categoria);
  if (!cat) notFound();

  const posts = await getPosts({ type: 'guide', categorySlug: categoria, limit: 20 });

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: 'Guia', href: '/guia' }, { label: cat.name }]}
          className="mb-6"
        />
        <h1 className="font-display font-extrabold text-heading-xl text-neutro-900 mb-2">
          {cat.name}
        </h1>
        {cat.description && <p className="text-neutro-600 mb-8">{cat.description}</p>}

        {posts.length === 0 ? (
          <EmptyState
            title="Nenhum artigo nesta categoria"
            description="Em breve teremos conteúdo aqui."
            icon={<BookOpen className="w-8 h-8" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post as PostWithAuthor} />
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { getPosts } from '@/lib/queries/getPosts';
import { Newspaper } from 'lucide-react';
import type { Metadata } from 'next';
import type { PostWithAuthor } from '@/types';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog — Notícias e Análises',
  description: 'Notícias, análises e relatos do movimento estudantil da UERN e do Movimento Correnteza.',
};

export default async function BlogPage() {
  const posts = await getPosts({ type: 'blog', limit: 12 });

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb items={[{ label: 'Blog' }]} className="mb-6" />
        <h1 className="font-display font-extrabold text-heading-xl text-neutro-900 mb-2">Blog</h1>
        <p className="text-neutro-600 mb-8">Notícias, análises e relatos do movimento estudantil.</p>

        {posts.length === 0 ? (
          <EmptyState
            title="Nenhum post publicado ainda"
            description="Volte em breve para conferir as novidades do movimento."
            icon={<Newspaper className="w-8 h-8" />}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.id} post={post as PostWithAuthor} />
            ))}
          </div>
        )}
      </Container>
    </PageLayout>
  );
}

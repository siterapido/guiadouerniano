import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { getPostBySlug } from '@/lib/queries/getPosts';
import { formatDate } from '@/lib/utils/format';
import type { Metadata } from 'next';

interface GuiaArtigoPageProps {
  params: Promise<{ categoria: string; slug: string }>;
}

export async function generateMetadata({ params }: GuiaArtigoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Artigo não encontrado' };
  return {
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
  };
}

export default async function GuiaArtigoPage({ params }: GuiaArtigoPageProps) {
  const { categoria, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.type !== 'guide') notFound();

  return (
    <PageLayout>
      <Container size="md" className="py-8">
        <Breadcrumb
          items={[
            { label: 'Guia', href: '/guia' },
            { label: post.category.name, href: `/guia/${categoria}` },
            { label: post.title },
          ]}
          className="mb-6"
        />

        <Badge variant="primary" className="mb-3">{post.category.name}</Badge>

        <h1 className="font-display font-extrabold text-display-lg text-neutro-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutro-200">
          <Avatar src={post.author.avatar_url} name={post.author.name} size="sm" />
          <div>
            <p className="text-sm font-semibold text-neutro-900">{post.author.name}</p>
            {post.updated_at && (
              <p className="text-xs text-neutro-600">
                Atualizado em {formatDate(post.updated_at)}
              </p>
            )}
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Container>
    </PageLayout>
  );
}

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { getPostBySlug } from '@/lib/queries/getPosts';
import { formatDate, formatReadingTime } from '@/lib/utils/format';
import { Clock, Eye } from 'lucide-react';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post não encontrado' };
  return {
    title: post.title,
    description: post.meta_description ?? post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.meta_description ?? post.excerpt ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageLayout>
      <article>
        {/* Cover */}
        {post.cover_image_url && (
          <div className="relative aspect-video max-h-[480px] overflow-hidden">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}

        <Container size="md" className="py-8">
          <Breadcrumb
            items={[{ label: 'Blog', href: '/blog' }, { label: post.category.name, href: `/blog?cat=${post.category.slug}` }, { label: post.title }]}
            className="mb-6"
          />

          <Badge variant="primary" className="mb-3">{post.category.name}</Badge>

          <h1 className="font-display font-extrabold text-display-lg text-neutro-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Metadados */}
          <div className="flex items-center gap-3 flex-wrap mb-8 pb-8 border-b border-neutro-200">
            <div className="flex items-center gap-2">
              <Avatar src={post.author.avatar_url} name={post.author.name} size="sm" />
              <div>
                <p className="text-sm font-semibold text-neutro-900">{post.author.name}</p>
                {post.published_at && (
                  <p className="text-xs text-neutro-600">{formatDate(post.published_at)}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-neutro-600 ml-auto">
              {post.reading_time && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadingTime(post.reading_time)}</span>
                </div>
              )}
              {post.views_count > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views_count} visualizações</span>
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Container>
      </article>
    </PageLayout>
  );
}

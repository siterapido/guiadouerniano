import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { FeaturedCard } from '@/components/content/FeaturedCard';
import { ArticleCard } from '@/components/content/ArticleCard';
import { EventCard } from '@/components/content/EventCard';
import { GuideCard } from '@/components/content/GuideCard';
import { SearchBar } from '@/components/navigation/SearchBar';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { getPosts, getFeaturedPost } from '@/lib/queries/getPosts';
import { getEvents } from '@/lib/queries/getEvents';
import { guideCategories } from '@/config/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import type { PostWithAuthor, EventWithOrganizer } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Guia do UERNIANO — Portal dos Estudantes da UERN',
  description: 'Portal central para estudantes da Universidade do Estado do Rio Grande do Norte. Informações acadêmicas, movimento estudantil e comunidade.',
};

export default async function HomePage() {
  return (
    <PageLayout>
      {/* Hero Search */}
      <section className="bg-gradient-to-br from-azul-uern to-azul-correnteza py-10 px-4">
        <Container size="lg">
          <h1 className="font-display font-extrabold text-display-lg text-white mb-2 text-center">
            Guia do UERNIANO
          </h1>
          <p className="text-white/80 text-center mb-6 text-body-md">
            Tudo que um estudante da UERN precisa saber, em um só lugar.
          </p>
          <SearchBar className="max-w-xl mx-auto" />
        </Container>
      </section>

      <Container size="xl" className="py-8 space-y-12">
        {/* Post em destaque */}
        <Suspense fallback={<SkeletonCard />}>
          <FeaturedPostSection />
        </Suspense>

        {/* Acesso Rápido ao Guia */}
        <section aria-labelledby="guia-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="guia-heading" className="font-display font-bold text-heading-lg text-neutro-900">
              Guia da UERN
            </h2>
            <Link href="/guia" className="text-sm text-azul-correnteza hover:underline font-medium">
              Ver tudo →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guideCategories.slice(0, 6).map((cat) => (
              <GuideCard
                key={cat.slug}
                title={cat.name}
                slug={cat.slug}
                icon={cat.icon}
                color={cat.color}
              />
            ))}
          </div>
        </section>

        {/* Últimas do Blog */}
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}</div>}>
          <RecentPostsSection />
        </Suspense>

        {/* Próximos Eventos */}
        <Suspense fallback={<SkeletonCard />}>
          <UpcomingEventsSection />
        </Suspense>
      </Container>
    </PageLayout>
  );
}

async function FeaturedPostSection() {
  const post = await getFeaturedPost();
  if (!post) return null;
  return (
    <section aria-label="Post em destaque">
      <FeaturedCard post={post as PostWithAuthor} />
    </section>
  );
}

async function RecentPostsSection() {
  const posts = await getPosts({ type: 'blog', limit: 3 });
  if (!posts.length) return null;
  return (
    <section aria-labelledby="blog-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="blog-heading" className="font-display font-bold text-heading-lg text-neutro-900">
          Do Movimento
        </h2>
        <Link href="/blog" className="text-sm text-azul-correnteza hover:underline font-medium">
          Ver todas →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post as PostWithAuthor} />
        ))}
      </div>
    </section>
  );
}

async function UpcomingEventsSection() {
  const events = await getEvents({ status: 'upcoming', limit: 3 });
  if (!events.length) return null;
  return (
    <section aria-labelledby="eventos-heading">
      <div className="flex items-center justify-between mb-4">
        <h2 id="eventos-heading" className="font-display font-bold text-heading-lg text-neutro-900">
          Próximos Eventos
        </h2>
        <Link href="/eventos" className="text-sm text-azul-correnteza hover:underline font-medium">
          Ver todos →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event as EventWithOrganizer} />
        ))}
      </div>
    </section>
  );
}

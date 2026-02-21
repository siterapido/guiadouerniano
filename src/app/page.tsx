import { Suspense } from 'react';
import { Calendar, ChevronRight, Lock, MapPin } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { FeaturedSlider } from '@/components/specific/FeaturedSlider';
import { ArticleCard } from '@/components/content/ArticleCard';
import { GuideCard } from '@/components/content/GuideCard';
import { SearchBar } from '@/components/navigation/SearchBar';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { HorizontalScroll } from '@/components/specific/HorizontalScroll';
import { getPosts } from '@/lib/queries/getPosts';
import { getEvents } from '@/lib/queries/getEvents';
import { guideCategories } from '@/config/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Guia do UERNIANO — Portal dos Estudantes da UERN',
  description: 'Portal central para estudantes da Universidade do Estado do Rio Grande do Norte. Informações acadêmicas, movimento estudantil e comunidade.',
};

const heroStats = [
  { value: '8', label: 'categorias do guia' },
  { value: '10+', label: 'campi cobertos' },
  { value: '100%', label: 'livre e gratuito' },
];

export default async function HomePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-azul-uern via-azul-correnteza to-azul-brilhante overflow-hidden relative">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-white/5" />
        <div className="relative py-12 px-4">
          <Container size="lg">
            <div className="text-center">
              <span className="inline-block mb-4 px-4 py-1.5 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-widest">
                Movimento Correnteza × UERN
              </span>
              <h1 className="font-display font-extrabold text-display-lg text-white mb-3">
                Guia do UERNIANO
              </h1>
              <p className="text-white/80 mb-6 text-body-md max-w-xl mx-auto">
                Tudo que um estudante da UERN precisa saber, em um só lugar.
              </p>
              <SearchBar className="max-w-xl mx-auto" />
              {/* Stats row */}
              <div className="flex justify-center gap-8 mt-8 flex-wrap">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display font-extrabold text-2xl text-white">{stat.value}</div>
                    <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
        {/* Wave */}
        <svg viewBox="0 0 1440 40" className="w-full block" aria-hidden="true" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" fill="white" />
        </svg>
      </section>

      <div className="bg-white">
        {/* Quick Access chips */}
        <section aria-label="Acesso rápido às categorias" className="pt-6 pb-2">
          <Container size="xl">
            <p className="text-xs uppercase tracking-widest text-neutro-600 font-semibold mb-3">
              Acesso rápido
            </p>
            <HorizontalScroll gap="sm">
              {guideCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/guia/${cat.slug}`}
                  className="flex-shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-neutro-200 bg-white text-neutro-800 text-sm font-medium hover:border-azul-correnteza hover:text-azul-correnteza transition-all min-h-[44px] whitespace-nowrap"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  {cat.name}
                </Link>
              ))}
            </HorizontalScroll>
          </Container>
        </section>

        {/* Posts em destaque — slider */}
        <Suspense
          fallback={
            <Container size="xl" className="pt-8">
              <div className="h-[420px] md:h-[520px] rounded-2xl bg-neutro-200 animate-pulse" />
            </Container>
          }
        >
          <FeaturedSliderSection />
        </Suspense>

        {/* Guia da UERN */}
        <section aria-labelledby="guia-heading" className="pt-10">
          <Container size="xl">
            <div className="flex items-center justify-between mb-4">
              <h2 id="guia-heading" className="font-display font-bold text-heading-lg text-neutro-900">
                Guia da UERN
              </h2>
              <Link href="/guia" className="text-sm text-azul-correnteza hover:underline font-medium">
                Ver tudo →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {guideCategories.map((cat) => (
                <GuideCard
                  key={cat.slug}
                  title={cat.name}
                  slug={cat.slug}
                  icon={cat.icon}
                  color={cat.color}
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Blog & Notícias — magazine layout */}
        <Suspense
          fallback={
            <Container size="xl" className="pt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </Container>
          }
        >
          <RecentPostsSection />
        </Suspense>
      </div>

      {/* ── Próximos Eventos — faixa full-width azul ── */}
      <Suspense
        fallback={
          <div className="bg-azul-uern py-12 md:py-16">
            <Container size="xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-52 rounded-xl bg-white/10 animate-pulse" />
                ))}
              </div>
            </Container>
          </div>
        }
      >
        <UpcomingEventsSection />
      </Suspense>

      <div className="bg-white">
        {/* Movimento Correnteza banner */}
        <section aria-labelledby="movimento-heading" className="pt-10 pb-4">
          <Container size="xl">
            <div className="rounded-2xl bg-gradient-to-br from-azul-uern to-azul-correnteza p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
              <div className="flex-1">
                <span className="inline-block mb-3 px-3 py-1 bg-white/15 text-white rounded-full text-xs font-semibold uppercase tracking-widest">
                  Quem somos
                </span>
                <h2 id="movimento-heading" className="font-display font-extrabold text-heading-lg text-white mb-3">
                  Movimento Correnteza
                </h2>
                <p className="text-white/80 text-body-sm leading-relaxed max-w-lg">
                  Somos um movimento estudantil comprometido com a luta por educação pública, gratuita e de qualidade na UERN e em todo o Rio Grande do Norte.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/movimento"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-azul-uern font-semibold text-sm hover:bg-neutro-100 transition-colors min-h-[44px]"
                >
                  Conhecer o movimento
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>

      {/* Membros CTA — full-bleed dark */}
      <section className="bg-neutro-950" aria-labelledby="membros-heading">
        <Container size="xl" className="py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="flex-1 flex gap-5 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-azul-correnteza/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-azul-correnteza" />
              </div>
              <div>
                <h2 id="membros-heading" className="font-display font-extrabold text-heading-lg text-white mb-2">
                  Área de Membros
                </h2>
                <p className="text-neutro-400 text-body-sm leading-relaxed max-w-lg">
                  Acesse materiais exclusivos, documentos do movimento e recursos acadêmicos disponíveis apenas para membros cadastrados.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/membros"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-azul-correnteza text-white font-semibold text-sm hover:bg-azul-brilhante transition-colors min-h-[44px]"
              >
                Acessar área de membros
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutro-800 text-neutro-400 font-semibold text-sm hover:border-neutro-600 hover:text-neutro-200 transition-colors min-h-[44px]"
              >
                Entrar na conta
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}

async function FeaturedSliderSection() {
  const posts = await getPosts({ type: 'blog', featured: true, limit: 3 });
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="destaque-heading" className="pt-10">
      <Container size="xl">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-azul-correnteza font-bold mb-1">
              Últimas publicações
            </p>
            <h2 id="destaque-heading" className="font-display font-extrabold text-heading-lg text-neutro-900">
              Blog em Destaque
            </h2>
          </div>
          <Link href="/blog" className="text-sm text-azul-correnteza hover:underline font-medium flex-shrink-0 mb-1">
            Ver todos →
          </Link>
        </div>
        <FeaturedSlider posts={posts} />
      </Container>
    </section>
  );
}

async function RecentPostsSection() {
  const posts = await getPosts({ type: 'blog', limit: 4 });
  if (!posts.length) return null;
  const [featured, ...rest] = posts;
  if (featured === undefined) return null;
  return (
    <section aria-labelledby="blog-heading" className="pt-10">
      <Container size="xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-azul-correnteza font-semibold mb-1">
              Últimas publicações
            </p>
            <h2 id="blog-heading" className="font-display font-bold text-heading-lg text-neutro-900">
              Blog &amp; Notícias
            </h2>
          </div>
          <Link href="/blog" className="text-sm text-azul-correnteza hover:underline font-medium flex-shrink-0">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2">
            <ArticleCard post={featured} variant="featured" />
          </div>
          <div className="flex flex-col gap-4">
            {rest[0] && <ArticleCard post={rest[0]} />}
            {rest[1] && <ArticleCard post={rest[1]} />}
          </div>
        </div>

        {rest[2] && (
          <div className="mt-4 border border-neutro-200 rounded-xl overflow-hidden">
            <ArticleCard post={rest[2]} variant="horizontal" />
          </div>
        )}

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutro-200 text-neutro-800 font-semibold text-sm hover:border-azul-correnteza hover:text-azul-correnteza transition-colors min-h-[44px]"
          >
            Ver todas as publicações
          </Link>
        </div>
      </Container>
    </section>
  );
}

async function UpcomingEventsSection() {
  const events = await getEvents({ status: 'upcoming', limit: 4 });
  if (!events.length) return null;

  const [featured, ...rest] = events;
  if (!featured) return null;

  const featuredDate = new Date(featured.starts_at);
  const featuredDay = featuredDate.getDate().toString().padStart(2, '0');
  const featuredMonth = featuredDate.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();

  const eventTypeLabel: Record<string, string> = {
    assembleia: 'Assembleia',
    palestra: 'Palestra',
    protesto: 'Protesto',
    encontro: 'Encontro',
    atividade: 'Atividade',
    outro: 'Evento',
  };

  return (
    <section aria-labelledby="eventos-heading" className="bg-neutro-100 py-12 md:py-16">
      <Container size="xl">
        {/* Cabeçalho */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-azul-correnteza font-bold mb-1">
              Agenda
            </p>
            <h2 id="eventos-heading" className="font-display font-extrabold text-heading-lg text-neutro-900">
              Próximos Eventos
            </h2>
          </div>
          <Link
            href="/eventos"
            className="hidden md:inline-flex items-center gap-1.5 text-sm text-azul-correnteza hover:underline font-medium mb-1"
          >
            Ver todos <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid: destaque + lista */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">

          {/* Evento em destaque */}
          <Link
            href={`/eventos/${featured.slug}`}
            className="lg:col-span-3 group rounded-2xl overflow-hidden bg-white border border-neutro-200 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col"
          >
            {/* Topo colorido com data */}
            <div className="bg-gradient-to-br from-azul-uern to-azul-correnteza p-6 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/5" />
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm">
                  <span className="font-display font-extrabold text-2xl text-azul-uern leading-none">{featuredDay}</span>
                  <span className="text-azul-correnteza text-xs font-bold tracking-wider">{featuredMonth}</span>
                </div>
                <div className="flex-1">
                  <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold">
                    {eventTypeLabel[featured.type] ?? 'Evento'}
                  </span>
                  <h3 className="font-display font-bold text-white text-heading-md leading-snug line-clamp-2 group-hover:text-neutro-100 transition-colors">
                    {featured.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Corpo */}
            <div className="p-6 flex flex-col flex-1">
              <p className="text-neutro-600 text-body-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-neutro-500 mb-4">
                {featured.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-azul-correnteza flex-shrink-0" />
                    {featured.location}
                  </span>
                )}
                {featured.campus && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutro-300" />
                    <span className="capitalize">{featured.campus}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-neutro-100">
                <span className="text-neutro-400 text-xs">Próximo evento</span>
                <span className="text-azul-correnteza text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ver detalhes <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Eventos seguintes */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {rest.map((event) => {
              const d = new Date(event.starts_at);
              const day = d.getDate().toString().padStart(2, '0');
              const month = d.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
              return (
                <Link
                  key={event.id}
                  href={`/eventos/${event.slug}`}
                  className="group flex items-center gap-4 rounded-xl bg-white border border-neutro-200 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 p-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-azul-uern/8 border border-azul-uern/15 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-azul-uern text-lg leading-none">{day}</span>
                    <span className="text-azul-correnteza text-[10px] font-bold tracking-wider">{month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-neutro-800 text-sm leading-snug line-clamp-2 group-hover:text-azul-correnteza transition-colors">
                      {event.title}
                    </p>
                    {event.location && (
                      <p className="text-neutro-400 text-xs mt-0.5 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {event.location}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutro-300 group-hover:text-azul-correnteza flex-shrink-0 transition-colors" />
                </Link>
              );
            })}

            <Link
              href="/eventos"
              className="flex items-center justify-center gap-2 rounded-xl border border-neutro-200 bg-white text-neutro-700 hover:border-azul-correnteza hover:text-azul-correnteza transition-all text-sm font-semibold py-3 px-4 min-h-[44px] shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Ver agenda completa
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

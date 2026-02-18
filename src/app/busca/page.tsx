import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/content/ArticleCard';
import { SearchBar } from '@/components/navigation/SearchBar';
import { EmptyState } from '@/components/feedback/EmptyState';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { Search } from 'lucide-react';
import type { Metadata } from 'next';
import type { PostWithAuthor, SearchParams } from '@/types';

export const dynamic = 'force-dynamic';

interface BuscaPageProps {
  searchParams: Promise<SearchParams>;
}

export async function generateMetadata({ searchParams }: BuscaPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Busca por "${q}"` : 'Buscar',
    robots: 'noindex',
  };
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  let results: PostWithAuthor[] = [];

  if (query.length >= 2) {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
      .from('posts')
      .select(`
        *,
        author:profiles(id, name, avatar_url),
        category:categories(id, name, slug, color)
      `)
      .eq('status', 'published')
      .is('deleted_at', null)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(20);

    results = (data ?? []) as PostWithAuthor[];
  }

  return (
    <PageLayout>
      <Container className="py-8">
        <h1 className="font-display font-bold text-heading-xl text-neutro-900 mb-6">
          Buscar
        </h1>
        <SearchBar defaultValue={query} autoFocus className="mb-8" />

        {query.length >= 2 ? (
          <>
            <p className="text-neutro-600 mb-6">
              {results.length === 0
                ? `Nenhum resultado para "${query}"`
                : `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`}
            </p>
            {results.length === 0 ? (
              <EmptyState
                title="Nada encontrado"
                description="Tente buscar com outros termos."
                icon={<Search className="w-8 h-8" />}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((post) => (
                  <ArticleCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="O que você está procurando?"
            description="Digite pelo menos 2 caracteres para buscar posts, guias e eventos."
            icon={<Search className="w-8 h-8" />}
          />
        )}
      </Container>
    </PageLayout>
  );
}

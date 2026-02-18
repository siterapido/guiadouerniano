import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import { GuideCard } from '@/components/content/GuideCard';
import { SearchBar } from '@/components/navigation/SearchBar';
import { getCategories } from '@/lib/queries/getCategories';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Guia da UERN',
  description: 'Tudo que um estudante da UERN precisa saber: matrícula, serviços, restaurante universitário, assistência estudantil e muito mais.',
};

export default async function GuiaPage() {
  const categories = await getCategories('guide');

  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-azul-uern to-azul-correnteza py-10 px-4">
        <Container size="lg">
          <h1 className="font-display font-extrabold text-display-lg text-white mb-2 text-center">
            Guia da UERN
          </h1>
          <p className="text-white/80 text-center mb-6">
            Tudo que você precisa saber sobre a universidade, em um só lugar.
          </p>
          <SearchBar
            placeholder="Buscar no guia..."
            className="max-w-xl mx-auto"
          />
        </Container>
      </div>

      <Container className="py-10">
        <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-6">
          Categorias
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <GuideCard
              key={cat.id}
              title={cat.name}
              slug={cat.slug}
              icon={cat.icon ?? undefined}
              color={cat.color ?? '#1A5FB4'}
              description={cat.description}
            />
          ))}
        </div>
      </Container>
    </PageLayout>
  );
}

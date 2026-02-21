import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import {
  Megaphone,
  Users,
  BookOpen,
  Shield,
  Heart,
  Zap,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Building2,
  Vote,
  Handshake,
} from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Movimento Estudantil — Guia do UERNIANO',
  description:
    'Entenda o movimento estudantil, seus direitos, suas ferramentas de luta e conheça o Movimento Correnteza na UERN.',
};

const porqueParticipar = [
  {
    icon: Shield,
    title: 'Defesa dos seus direitos',
    desc: 'O ME fiscaliza e defende os direitos dos estudantes perante a universidade e o poder público.',
  },
  {
    icon: Users,
    title: 'Representação política',
    desc: 'Através do DCE e dos Centros Acadêmicos, os estudantes têm voz nas decisões da universidade.',
  },
  {
    icon: BookOpen,
    title: 'Educação política e crítica',
    desc: 'O movimento forma cidadãos conscientes sobre seus direitos, deveres e a realidade social.',
  },
  {
    icon: Handshake,
    title: 'Solidariedade coletiva',
    desc: 'Ninguém avança sozinho. O ME constrói redes de apoio para enfrentar as dificuldades da vida universitária.',
  },
];

const ferramentas = [
  {
    icon: GraduationCap,
    title: 'Centro Acadêmico (CA)',
    desc: 'Representa os estudantes de um curso específico. É a entidade mais próxima do cotidiano do aluno — organiza semanas acadêmicas, representa a turma junto à coordenação e articula demandas locais.',
  },
  {
    icon: Building2,
    title: 'Diretório Central dos Estudantes (DCE)',
    desc: 'Representa todos os estudantes de uma universidade. Tem assento em órgãos colegiados, negocia com a reitoria e articula lutas em âmbito institucional.',
  },
  {
    icon: Vote,
    title: 'Assembleia Estudantil',
    desc: 'Instância máxima de deliberação dos estudantes. Nela, qualquer aluno pode votar e propor pautas. É onde as decisões coletivas são tomadas democraticamente.',
  },
  {
    icon: Megaphone,
    title: 'Atos e mobilizações',
    desc: 'Passeatas, greves, ocupações e manifestações são ferramentas históricas do ME para pressionar por mudanças e tornar as demandas estudantis visíveis.',
  },
];

const conquistasHistoricas = [
  {
    year: '1968',
    titulo: 'Reformas universitárias',
    desc: 'O ME brasileiro protagonizou as grandes mobilizações contra a ditadura militar, exigindo reforma universitária e liberdade de ensino.',
  },
  {
    year: '1980s',
    titulo: 'Redemocratização',
    desc: 'Estudantes foram protagonistas na luta pelas Diretas Já e pela redemocratização do Brasil.',
  },
  {
    year: '1992',
    titulo: 'Cara Pintada',
    desc: 'O movimento estudantil foi a vanguarda do impeachment de Collor, mobilizando a sociedade com os "Caras Pintadas".',
  },
  {
    year: '2016',
    titulo: 'Ocupações nas escolas',
    desc: 'Estudantes secundaristas e universitários ocuparam mais de 1.000 escolas contra a PEC 241 e a reforma do ensino médio.',
  },
];

const valoresCorrenteza = [
  { emoji: '✊', title: 'Combatividade', desc: 'Não nos calar diante das injustiças. Lutar por melhores condições para todos os estudantes.' },
  { emoji: '🤝', title: 'Solidariedade', desc: 'Construir uma universidade mais acolhedora, que cuida de quem chega.' },
  { emoji: '📚', title: 'Educação de qualidade', desc: 'Defender o ensino público, gratuito e de qualidade como direito fundamental.' },
  { emoji: '🏳️‍🌈', title: 'Diversidade', desc: 'Uma universidade plural, que respeita e celebra todas as identidades.' },
];

const lutasCorrenteza = [
  'Melhoria do Restaurante Universitário (RU)',
  'Ampliação da assistência estudantil',
  'Combate ao assédio moral e sexual',
  'Defesa da educação pública e gratuita',
  'Respeito à diversidade e inclusão LGBTQIA+',
  'Transparência na gestão universitária',
];

export default function MovimentoPage() {
  return (
    <PageLayout>
      {/* Hero — Movimento Estudantil */}
      <div className="bg-gradient-to-br from-neutro-950 via-neutro-900 to-azul-uern py-20 text-white">
        <Container size="lg" className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <Megaphone className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Movimento Estudantil</span>
          </div>
          <h1 className="font-display font-extrabold text-display-xl mb-6 leading-tight">
            A universidade é nossa.
            <br />
            <span className="text-azul-brilhante">Organize-se.</span>
          </h1>
          <p className="text-white/75 text-body-lg max-w-2xl mx-auto leading-relaxed">
            O movimento estudantil é uma das forças políticas mais importantes da história do Brasil.
            Entenda o que é, como funciona e por que participar.
          </p>
        </Container>
      </div>

      <Container className="py-16 space-y-20">

        {/* O que é o ME */}
        <section>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-6">
              O que é o movimento estudantil?
            </h2>
            <div className="space-y-4 text-body-md text-neutro-600 leading-relaxed">
              <p>
                O <strong className="text-neutro-900">movimento estudantil (ME)</strong> é a organização política e social dos
                estudantes para defender seus direitos, melhorar as condições de ensino e participar ativamente
                das decisões que afetam a vida universitária e a sociedade.
              </p>
              <p>
                Mais do que uma estrutura burocrática, o ME é uma forma de os estudantes exercerem poder coletivo:
                negociar com a reitoria, pressionar o poder público, combater injustiças dentro do campus e construir
                uma universidade mais democrática e acessível.
              </p>
              <p>
                Na UERN, o movimento estudantil se organiza por meio dos <strong className="text-neutro-900">Centros Acadêmicos</strong> de
                cada curso, do <strong className="text-neutro-900">Diretório Central dos Estudantes (DCE)</strong> e das assembleias
                estudantis — espaços onde qualquer estudante pode participar e votar.
              </p>
            </div>
          </div>
        </section>

        {/* Por que participar */}
        <section>
          <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-3">
            Por que participar?
          </h2>
          <p className="text-body-md text-neutro-600 mb-8 max-w-2xl">
            Participar do movimento estudantil não é só &ldquo;política&rdquo; — é cuidar da sua própria formação e das condições
            em que você estuda.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {porqueParticipar.map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-white rounded-xl border border-neutro-200">
                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-azul-correnteza/10 rounded-lg">
                  <item.icon className="w-5 h-5 text-azul-correnteza" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-neutro-900 mb-1">{item.title}</h3>
                  <p className="text-body-sm text-neutro-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ferramentas do ME */}
        <section>
          <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-3">
            As ferramentas do movimento
          </h2>
          <p className="text-body-md text-neutro-600 mb-8 max-w-2xl">
            O ME se organiza através de diferentes estruturas, cada uma com seu papel na defesa dos estudantes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ferramentas.map((item) => (
              <div key={item.title} className="p-6 bg-neutro-100 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-azul-uern" />
                  <h3 className="font-display font-bold text-heading-sm text-neutro-900">{item.title}</h3>
                </div>
                <p className="text-body-sm text-neutro-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conquistas históricas */}
        <section>
          <h2 className="font-display font-bold text-heading-lg text-neutro-900 mb-3">
            O que o ME já conquistou
          </h2>
          <p className="text-body-md text-neutro-600 mb-10 max-w-2xl">
            A história do Brasil é também a história de estudantes organizados que não aceitaram o que estava posto.
          </p>
          <div className="relative pl-8 border-l-2 border-azul-correnteza/30 space-y-8">
            {conquistasHistoricas.map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-azul-correnteza border-2 border-white" />
                <span className="inline-block text-sm font-bold text-azul-correnteza mb-1">{item.year}</span>
                <h3 className="font-display font-bold text-neutro-900 mb-1">{item.titulo}</h3>
                <p className="text-body-sm text-neutro-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divisor — transição para Correnteza */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutro-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-neutro-100 px-6 py-2 rounded-full text-sm font-semibold text-neutro-600 uppercase tracking-widest">
              Na UERN
            </span>
          </div>
        </div>

        {/* Movimento Correnteza — apresentação */}
        <section>
          <div className="bg-gradient-to-br from-azul-uern to-azul-correnteza rounded-2xl p-8 text-white mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full mb-4 text-sm font-semibold">
              <Zap className="w-4 h-4" />
              Movimento estudantil da UERN
            </div>
            <h2 className="font-display font-extrabold text-display-md mb-4">
              Movimento Correnteza
            </h2>
            <p className="text-white/80 text-body-lg max-w-2xl leading-relaxed">
              Somos uma organização estudantil comprometida com a democratização da UERN,
              a defesa do ensino público e a construção de uma comunidade universitária
              unida, combativa e solidária.
            </p>
          </div>

          {/* Valores */}
          <h3 className="font-display font-bold text-heading-md text-neutro-900 mb-6">
            Nossos valores
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {valoresCorrenteza.map((v) => (
              <div key={v.title} className="text-center p-6 bg-white rounded-xl border border-neutro-200">
                <div className="text-4xl mb-3">{v.emoji}</div>
                <h4 className="font-display font-bold text-neutro-900 mb-2">{v.title}</h4>
                <p className="text-body-sm text-neutro-600">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Nossas lutas */}
          <h3 className="font-display font-bold text-heading-md text-neutro-900 mb-6">
            Nossas lutas
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
            {lutasCorrenteza.map((luta) => (
              <li key={luta} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-neutro-200">
                <ChevronRight className="w-4 h-4 shrink-0 text-vermelho-luta" />
                <span className="text-body-sm text-neutro-800">{luta}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="bg-vermelho-luta/5 border border-vermelho-luta/20 rounded-xl p-8 text-center">
            <Heart className="w-8 h-8 text-vermelho-luta mx-auto mb-4" />
            <h3 className="font-display font-bold text-heading-md text-neutro-900 mb-3">
              Faça parte da luta
            </h3>
            <p className="text-body-md text-neutro-600 mb-6 max-w-md mx-auto">
              A universidade pública existe porque muita gente lutou por ela. Venha continuar essa história.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://instagram.com/movimentocorrenteza"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-azul-correnteza text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-azul-uern transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Siga no Instagram
              </a>
              <Link
                href="/eventos"
                className="inline-flex items-center justify-center gap-2 border border-neutro-200 text-neutro-800 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-neutro-100 transition-colors"
              >
                Ver próximos eventos
              </Link>
            </div>
          </div>
        </section>

      </Container>
    </PageLayout>
  );
}

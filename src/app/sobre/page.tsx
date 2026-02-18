import { PageLayout } from '@/components/layout/PageLayout';
import { Container } from '@/components/layout/Container';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Sobre o Projeto',
  description: 'Conheça o Guia do UERNIANO, criado pelo Movimento Correnteza para estudantes da UERN.',
};

export default function SobrePage() {
  return (
    <PageLayout>
      <Container size="md" className="py-12">
        <h1 className="font-display font-extrabold text-display-lg text-neutro-900 mb-6">
          Sobre o Projeto
        </h1>

        <div className="prose prose-lg max-w-none">
          <p>
            O <strong>Guia do UERNIANO</strong> é um portal criado pelo{' '}
            <strong>Movimento Correnteza</strong> para centralizar informações essenciais para
            estudantes da Universidade do Estado do Rio Grande do Norte (UERN).
          </p>

          <h2>Nossa missão</h2>
          <p>
            Acreditamos que o acesso à informação é um direito de todos os estudantes. Por isso,
            criamos este portal para que nenhum universitário precise ficar perdido diante das
            burocracias acadêmicas, dos processos de matrícula ou das lutas do movimento estudantil.
          </p>

          <h2>O que você encontra aqui</h2>
          <ul>
            <li><strong>Guia da UERN:</strong> informações sobre matrícula, serviços, RU, campi e muito mais</li>
            <li><strong>Blog:</strong> notícias, análises e relatos do movimento estudantil</li>
            <li><strong>Eventos:</strong> assembleias, encontros e atividades do movimento</li>
            <li><strong>Área de Membros:</strong> materiais exclusivos para membros ativos do Correnteza</li>
          </ul>

          <h2>Movimento Correnteza</h2>
          <p>
            O Movimento Correnteza é uma organização estudantil comprometida com a democratização
            da universidade, a defesa do ensino público e de qualidade, e a construção de uma
            comunidade estudantil unida e combativa.
          </p>

          <p>
            Este projeto é de código aberto. Contribuições são bem-vindas no nosso repositório no
            GitHub.
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}

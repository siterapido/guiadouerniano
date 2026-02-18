import Link from 'next/link';
import { Divider } from '@/components/ui/Divider';
import { LoginForm } from '@/components/forms/LoginForm';
import { RegisterForm } from '@/components/forms/RegisterForm';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Acesse sua conta no Guia do UERNIANO.',
  robots: 'noindex',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutro-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-1 no-underline">
            <span className="font-display font-bold text-3xl text-azul-uern">Guia do</span>
            <span className="font-display font-extrabold text-3xl text-azul-correnteza">UERNIANO</span>
          </Link>
          <p className="text-neutro-600 mt-2 text-sm">Portal dos estudantes da UERN</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Tabs simples */}
          <div className="mb-6">
            <h1 className="font-display font-bold text-heading-lg text-neutro-900 mb-1">
              Acessar o Guia
            </h1>
            <p className="text-sm text-neutro-600">
              Novo por aqui?{' '}
              <a href="#cadastro" className="text-azul-correnteza font-medium hover:underline">
                Crie sua conta
              </a>
            </p>
          </div>

          <LoginForm />

          <Divider label="ou" className="my-6" />

          <div id="cadastro" className="pt-2">
            <h2 className="font-display font-bold text-heading-md text-neutro-900 mb-4">
              Criar conta
            </h2>
            <RegisterForm />
          </div>

          <p className="text-xs text-neutro-600 text-center mt-6">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/sobre" className="text-azul-correnteza hover:underline">
              termos de uso
            </Link>
            .
          </p>
        </div>

        <p className="text-center mt-4">
          <Link href="/" className="text-sm text-neutro-600 hover:text-azul-correnteza transition-colors">
            ← Voltar para o início
          </Link>
        </p>
      </div>
    </div>
  );
}

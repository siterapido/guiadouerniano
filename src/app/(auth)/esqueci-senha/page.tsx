import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Esqueci minha senha · ${siteConfig.name}`,
  description: 'Recupere o acesso à sua conta do Guia do UERNIANO.',
  robots: { index: false },
};

export default function EsqueciSenhaPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[--neutro-100] px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 bg-[--azul-uern] rounded-xl items-center justify-center mb-4">
            <span className="text-white font-bold font-display text-xl">G</span>
          </div>
          <h1 className="text-2xl font-extrabold font-display text-[--neutro-950]">
            Recuperar senha
          </h1>
          <p className="text-sm text-[--neutro-600] mt-2">
            Enviaremos um link de recuperação para seu email.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-[--neutro-200] shadow-sm p-6">
          <ForgotPasswordForm />
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-[--neutro-600] hover:text-[--azul-correnteza] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
}

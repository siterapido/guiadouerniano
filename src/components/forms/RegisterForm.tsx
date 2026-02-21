'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { signUpWithEmail, type AuthActionResult } from '@/lib/actions/auth';

const initialState: AuthActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth isLoading={pending} className="mt-2">
      Criar conta
    </Button>
  );
}

export function RegisterForm() {
  const [state, action] = useFormState(signUpWithEmail, initialState);

  if (state?.success) {
    return (
      <Alert variant="success" title="Conta criada!">
        Verifique seu email para confirmar o cadastro e acessar o guia.
      </Alert>
    );
  }

  return (
    <form action={action} noValidate className="space-y-4">
      {state?.error && <Alert variant="error">{state.error}</Alert>}

      <Input
        type="text"
        name="name"
        label="Nome completo"
        placeholder="Seu nome"
        autoComplete="name"
        required
        error={state?.fieldErrors?.name}
      />

      <Input
        type="email"
        name="email"
        label="Email"
        placeholder="seu@email.com"
        autoComplete="email"
        required
        error={state?.fieldErrors?.email}
      />

      <Input
        type="password"
        name="password"
        label="Senha"
        placeholder="Mínimo 8 caracteres"
        autoComplete="new-password"
        required
        error={state?.fieldErrors?.password}
      />

      <SubmitButton />
    </form>
  );
}

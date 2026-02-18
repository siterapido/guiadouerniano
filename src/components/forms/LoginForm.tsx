'use client';

import { useActionState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { signInWithEmail, type AuthActionResult } from '@/lib/actions/auth';

const initialState: AuthActionResult = { success: false };

export function LoginForm() {
  const [state, action, isPending] = useActionState(signInWithEmail, initialState);

  return (
    <form action={action} noValidate className="space-y-4">
      {state?.error && <Alert variant="error">{state.error}</Alert>}

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
        placeholder="Sua senha"
        autoComplete="current-password"
        required
        error={state?.fieldErrors?.password}
      />

      <Button type="submit" fullWidth isLoading={isPending} className="mt-2">
        Entrar
      </Button>
    </form>
  );
}

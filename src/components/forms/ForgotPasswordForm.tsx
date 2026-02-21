'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { resetPassword, type AuthActionResult } from '@/lib/actions/auth';

const initialState: AuthActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" fullWidth isLoading={pending} className="mt-2">
      Enviar link de recuperação
    </Button>
  );
}

export function ForgotPasswordForm() {
  const [state, action] = useFormState(resetPassword, initialState);

  if (state?.success) {
    return (
      <Alert variant="success" title="Email enviado!">
        Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
      </Alert>
    );
  }

  return (
    <form action={action} noValidate className="space-y-4">
      {state?.error && <Alert variant="error">{state.error}</Alert>}

      <Input
        type="email"
        name="email"
        label="Seu email"
        placeholder="seu@email.com"
        autoComplete="email"
        required
        error={state?.fieldErrors?.email}
      />

      <SubmitButton />
    </form>
  );
}

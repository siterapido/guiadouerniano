'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Alert } from '@/components/feedback/Alert';
import { Select } from '@/components/ui/Select';
import { createReport, type ReportActionResult } from '@/lib/actions/reports';

interface ReportFormProps {
  postId: string;
  onSuccess?: () => void;
}

const REASON_OPTIONS = [
  { value: 'incorrect', label: 'Informação incorreta ou desatualizada' },
  { value: 'spam', label: 'Spam ou conteúdo irrelevante' },
  { value: 'offensive', label: 'Conteúdo ofensivo ou inadequado' },
  { value: 'other', label: 'Outro motivo' },
];

const initialState: ReportActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} fullWidth>
      Enviar denúncia
    </Button>
  );
}

export function ReportForm({ postId, onSuccess: _onSuccess }: ReportFormProps) {
  const [state, action] = useFormState(
    (prev: ReportActionResult, formData: FormData) => createReport(prev, formData, postId),
    initialState
  );

  if (state.success) {
    return (
      <Alert variant="success" title="Denúncia enviada">
        Obrigado! Nossa equipe irá analisar em breve.
      </Alert>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.error && <Alert variant="error">{state.error}</Alert>}

      <Select
        name="reason"
        label="Motivo"
        required
        placeholder="Selecione um motivo"
        options={REASON_OPTIONS}
        error={state.fieldErrors?.reason}
      />

      <Textarea
        name="description"
        label="Descrição (opcional)"
        placeholder="Descreva o problema com mais detalhes..."
        rows={3}
        error={state.fieldErrors?.description}
      />

      <SubmitButton />
    </form>
  );
}

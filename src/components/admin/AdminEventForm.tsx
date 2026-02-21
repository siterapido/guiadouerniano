'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { createEvent, updateEvent, type EventActionResult } from '@/lib/actions/events';
import type { Event } from '@/types';

const initialState: EventActionResult = { success: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {label}
    </Button>
  );
}

interface AdminEventFormProps {
  event?: Event;
}

export function AdminEventForm({ event }: AdminEventFormProps) {
  const router = useRouter();

  const action = event ? updateEvent.bind(null, event.id) : createEvent;
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/admin/eventos');
    }
  }, [state.success, router]);

  const toDatetimeLocal = (iso: string | undefined) => {
    if (!iso) return '';
    return new Date(iso).toISOString().slice(0, 16);
  };

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">Evento salvo com sucesso!</Alert>}

      <Input
        name="title"
        label="Título"
        defaultValue={event?.title}
        error={state.fieldErrors?.title}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-neutro-800">
          Descrição curta
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={event?.description ?? ''}
          className="w-full px-4 py-3 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 resize-y"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="start_date" className="text-sm font-medium text-neutro-800">
            Início <span className="text-vermelho-luta" aria-hidden="true">*</span>
          </label>
          <input
            id="start_date"
            name="start_date"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event?.starts_at)}
            required
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10"
          />
          {state.fieldErrors?.start_date && (
            <p className="text-xs text-erro">{state.fieldErrors.start_date}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="end_date" className="text-sm font-medium text-neutro-800">
            Fim
          </label>
          <input
            id="end_date"
            name="end_date"
            type="datetime-local"
            defaultValue={toDatetimeLocal(event?.ends_at)}
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10"
          />
        </div>
      </div>

      <Input
        name="location"
        label="Local"
        defaultValue={event?.location ?? ''}
        error={state.fieldErrors?.location}
        placeholder="Ex: Auditório do CCSAH"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="type" className="text-sm font-medium text-neutro-800">
          Tipo <span className="text-vermelho-luta" aria-hidden="true">*</span>
        </label>
        <select
          id="type"
          name="type"
          defaultValue={event?.type ?? 'outro'}
          required
          className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
        >
          <option value="lecture">Palestra</option>
          <option value="workshop">Workshop</option>
          <option value="assembly">Assembleia</option>
          <option value="cultural">Cultural</option>
          <option value="sport">Esporte</option>
          <option value="protest">Protesto</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <Input
        name="cover_image_url"
        label="URL da imagem de capa"
        type="url"
        defaultValue={event?.cover_image_url ?? ''}
        placeholder="https://..."
      />

      <div className="flex gap-3 pt-2">
        <SubmitButton label={event ? 'Salvar alterações' : 'Criar evento'} />
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

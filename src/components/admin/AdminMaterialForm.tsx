'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { createMaterial, type AdminActionResult } from '@/lib/actions/admin';

const initialState: AdminActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      Adicionar material
    </Button>
  );
}

export function AdminMaterialForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createMaterial, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      router.push('/admin/materiais');
    }
  }, [state.success, router]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5 max-w-2xl">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">Material adicionado!</Alert>}

      <Input
        name="title"
        label="Título"
        error={state.fieldErrors?.title}
        required
        placeholder="Ex: Guia de Bolsas 2026"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-neutro-800">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full px-4 py-3 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 resize-y"
          placeholder="Breve descrição do material..."
        />
      </div>

      <Input
        name="file_url"
        label="URL do arquivo"
        type="url"
        error={state.fieldErrors?.file_url}
        required
        placeholder="https://drive.google.com/..."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="file_type" className="text-sm font-medium text-neutro-800">
            Tipo de arquivo <span className="text-vermelho-luta" aria-hidden="true">*</span>
          </label>
          <select
            id="file_type"
            name="file_type"
            defaultValue="pdf"
            required
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
          >
            <option value="pdf">PDF</option>
            <option value="video">Vídeo</option>
            <option value="link">Link</option>
            <option value="image">Imagem</option>
            <option value="doc">Documento</option>
          </select>
        </div>

        <Input
          name="category"
          label="Categoria"
          placeholder="Ex: Regulamentos"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_public"
          name="is_public"
          type="checkbox"
          value="true"
          className="w-5 h-5 rounded border-neutro-200 text-azul-correnteza"
        />
        <label htmlFor="is_public" className="text-sm font-medium text-neutro-800">
          Visível para todos (público)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <SubmitButton />
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

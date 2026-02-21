'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { createCategory, type AdminActionResult } from '@/lib/actions/admin';

const initialState: AdminActionResult = { success: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" isLoading={pending}>
      Adicionar
    </Button>
  );
}

export function AdminCategoryForm() {
  const [state, formAction] = useFormState(createCategory, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="bg-white rounded-xl border border-neutro-200 p-5 space-y-4">
      <h3 className="font-display font-bold text-neutro-900">Nova categoria</h3>

      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">Categoria criada!</Alert>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="name"
          label="Nome"
          error={state.fieldErrors?.name}
          required
          placeholder="Ex: Notícias"
        />
        <Input
          name="slug"
          label="Slug"
          error={state.fieldErrors?.slug}
          required
          placeholder="Ex: noticias"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="post_type" className="text-sm font-medium text-neutro-800">
            Tipo de post <span className="text-vermelho-luta" aria-hidden="true">*</span>
          </label>
          <select
            id="post_type"
            name="post_type"
            defaultValue="blog"
            required
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
          >
            <option value="blog">Blog</option>
            <option value="guide">Guia</option>
          </select>
        </div>
        <Input
          name="order_index"
          label="Ordem"
          type="number"
          defaultValue="0"
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          name="icon"
          label="Ícone (nome Lucide)"
          placeholder="Ex: FileText"
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="color" className="text-sm font-medium text-neutro-800">Cor</label>
          <input
            id="color"
            name="color"
            type="color"
            defaultValue="#1A5FB4"
            className="h-12 w-full rounded-md border border-neutro-200 px-2 cursor-pointer"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/feedback/Alert';
import { createPost, updatePost, type PostActionResult } from '@/lib/actions/posts';
import type { Category, Post } from '@/types';

const initialState: PostActionResult = { success: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {label}
    </Button>
  );
}

interface AdminPostFormProps {
  categories: Pick<Category, 'id' | 'name' | 'slug'>[];
  post?: Post;
}

export function AdminPostForm({ categories, post }: AdminPostFormProps) {
  const router = useRouter();

  const action = post
    ? updatePost.bind(null, post.id)
    : createPost;

  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.success) {
      if (state.slug) {
        router.push(`/admin/posts`);
      } else {
        router.push('/admin/posts');
      }
    }
  }, [state.success, state.slug, router]);

  return (
    <form action={formAction} className="space-y-5 max-w-2xl">
      {state.error && <Alert variant="error">{state.error}</Alert>}
      {state.success && <Alert variant="success">Post salvo com sucesso!</Alert>}

      <Input
        name="title"
        label="Título"
        defaultValue={post?.title}
        error={state.fieldErrors?.title}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-medium text-neutro-800">
          Resumo
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={post?.excerpt ?? ''}
          className="w-full px-4 py-3 rounded-md border border-neutro-200 text-neutro-900 placeholder:text-neutro-600 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 resize-y"
          placeholder="Breve resumo do post..."
        />
        {state.fieldErrors?.excerpt && (
          <p className="text-xs text-erro">{state.fieldErrors.excerpt}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-neutro-800">
          Conteúdo <span className="text-vermelho-luta" aria-hidden="true">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          rows={12}
          defaultValue={post?.content}
          required
          className="w-full px-4 py-3 rounded-md border border-neutro-200 text-neutro-900 placeholder:text-neutro-600 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 resize-y font-mono text-sm"
          placeholder="Conteúdo em HTML ou Markdown..."
        />
        {state.fieldErrors?.content && (
          <p className="text-xs text-erro">{state.fieldErrors.content}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-sm font-medium text-neutro-800">
            Tipo <span className="text-vermelho-luta" aria-hidden="true">*</span>
          </label>
          <select
            id="type"
            name="type"
            defaultValue={post?.type ?? 'blog'}
            required
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
          >
            <option value="blog">Blog</option>
            <option value="guide">Guia</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-sm font-medium text-neutro-800">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={post?.status ?? 'draft'}
            className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
          >
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="archived">Arquivado</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category_id" className="text-sm font-medium text-neutro-800">
          Categoria
        </label>
        <select
          id="category_id"
          name="category_id"
          defaultValue={post?.category_id ?? ''}
          className="h-12 px-4 rounded-md border border-neutro-200 text-neutro-900 focus:outline-none focus:border-azul-correnteza focus:ring-2 focus:ring-azul-correnteza/10 bg-white"
        >
          <option value="">Sem categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        name="cover_image_url"
        label="URL da imagem de capa"
        type="url"
        defaultValue={post?.cover_image_url ?? ''}
        error={state.fieldErrors?.cover_image_url}
        placeholder="https://..."
      />

      <div className="flex gap-3 pt-2">
        <SubmitButton label={post ? 'Salvar alterações' : 'Criar post'} />
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}

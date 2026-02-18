'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

const commentSchema = z.object({
  content: z.string().min(3, 'Mínimo de 3 caracteres').max(2000, 'Máximo de 2000 caracteres'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onSubmit?: (data: CommentFormData) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
}

export function CommentForm({ postId, parentId, onSubmit, onCancel, placeholder }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  async function handleFormSubmit(data: CommentFormData) {
    await onSubmit?.(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <Textarea
        {...register('content')}
        label={parentId ? 'Responder' : 'Deixe um comentário'}
        placeholder={placeholder ?? 'Escreva seu comentário aqui...'}
        error={errors.content?.message}
        rows={3}
      />
      <div className="flex gap-2 mt-3 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" size="sm" isLoading={isSubmitting}>
          {parentId ? 'Responder' : 'Comentar'}
        </Button>
      </div>
    </form>
  );
}

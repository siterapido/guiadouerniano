'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface FeedbackFormProps {
  postId: string;
  className?: string;
}

export function FeedbackForm({ postId, className }: FeedbackFormProps) {
  const [submitted, setSubmitted] = useState<'helpful' | 'not_helpful' | null>(null);

  async function handleFeedback(type: 'helpful' | 'not_helpful') {
    setSubmitted(type);
    // Map feedback to reaction type (like = helpful, clap = not_helpful for now)
    try {
      const { setReaction } = await import('@/lib/actions/reactions');
      await setReaction(postId, type === 'helpful' ? 'like' : 'clap');
    } catch {
      // fail silently — feedback is non-critical
    }
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center gap-2 py-6 text-center', className)}>
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
          <ThumbsUp className="w-6 h-6 text-green-600" aria-hidden="true" />
        </div>
        <p className="font-semibold text-[--neutro-900]">Obrigado pelo feedback!</p>
        <p className="text-sm text-[--neutro-600]">Sua opinião nos ajuda a melhorar o conteúdo.</p>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-4 py-6 border-t border-[--neutro-200]', className)}>
      <p className="text-sm font-medium text-[--neutro-800]">Este artigo foi útil?</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => void handleFeedback('helpful')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[--neutro-200] text-sm font-medium text-[--neutro-700] hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza] min-h-[44px]"
        >
          <ThumbsUp className="w-4 h-4" aria-hidden="true" />
          Sim, foi útil
        </button>
        <button
          type="button"
          onClick={() => void handleFeedback('not_helpful')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[--neutro-200] text-sm font-medium text-[--neutro-700] hover:border-red-300 hover:bg-red-50 hover:text-[--vermelho-luta] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza] min-h-[44px]"
        >
          <ThumbsDown className="w-4 h-4" aria-hidden="true" />
          Não muito
        </button>
      </div>
    </div>
  );
}

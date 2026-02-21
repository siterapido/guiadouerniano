import { getPendingComments } from '@/lib/queries/admin/getPendingComments';
import { CommentModerationList } from './CommentModerationList';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Comentários pendentes' };

export default async function AdminComentariosPage() {
  const comments = await getPendingComments();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">
          Comentários pendentes
        </h1>
        <p className="text-sm text-neutro-600 mt-1">
          {comments.length === 0
            ? 'Nenhum comentário aguardando aprovação.'
            : `${comments.length} comentário${comments.length > 1 ? 's' : ''} aguardando aprovação`}
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutro-200 p-12 text-center">
          <p className="text-neutro-600">Tudo em dia! Nenhum comentário pendente.</p>
        </div>
      ) : (
        <CommentModerationList comments={comments} />
      )}
    </div>
  );
}

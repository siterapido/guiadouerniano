'use client';

import { ModerationRow } from '@/components/admin/ModerationRow';
import { approveComment, adminDeleteComment } from '@/lib/actions/admin';
import type { PendingComment } from '@/lib/queries/admin/getPendingComments';

interface CommentModerationListProps {
  comments: PendingComment[];
}

export function CommentModerationList({ comments }: CommentModerationListProps) {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <ModerationRow
          key={comment.id}
          label={`${comment.author_name ?? comment.author_email} em "${comment.post_title}"`}
          sublabel={`Post: ${comment.post_title}`}
          body={comment.content}
          date={comment.created_at}
          approveLabel="Aprovar"
          onApprove={() => approveComment(comment.id)}
          onDelete={() => adminDeleteComment(comment.id)}
        />
      ))}
    </div>
  );
}

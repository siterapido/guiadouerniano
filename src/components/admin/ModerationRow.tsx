'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { Check, Trash2 } from 'lucide-react';
import type { AdminActionResult } from '@/lib/actions/admin';

interface ModerationRowProps {
  label: string;
  sublabel?: string;
  body: string;
  date: string;
  onApprove?: () => Promise<AdminActionResult>;
  onDelete: () => Promise<AdminActionResult>;
  approveLabel?: string;
}

export function ModerationRow({
  label,
  sublabel,
  body,
  date,
  onApprove,
  onDelete,
  approveLabel = 'Aprovar',
}: ModerationRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleApprove = () => {
    if (!onApprove) return;
    startTransition(async () => {
      await onApprove();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await onDelete();
    });
  };

  return (
    <div className="bg-white rounded-xl border border-neutro-200 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-neutro-900 text-sm truncate">{label}</p>
          {sublabel && <p className="text-xs text-neutro-600 truncate">{sublabel}</p>}
        </div>
        <time className="text-xs text-neutro-600 flex-shrink-0 mt-0.5">
          {new Date(date).toLocaleDateString('pt-BR')}
        </time>
      </div>
      <p className="text-sm text-neutro-800 line-clamp-3">{body}</p>
      <div className="flex gap-2 pt-1">
        {onApprove && (
          <Button
            size="sm"
            variant="primary"
            onClick={handleApprove}
            isLoading={isPending}
            leftIcon={<Check size={14} />}
            aria-label={approveLabel}
          >
            {approveLabel}
          </Button>
        )}
        <Button
          size="sm"
          variant="danger"
          onClick={handleDelete}
          isLoading={isPending}
          leftIcon={<Trash2 size={14} />}
          aria-label="Deletar"
        >
          Deletar
        </Button>
      </div>
    </div>
  );
}

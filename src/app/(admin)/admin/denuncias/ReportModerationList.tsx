'use client';

import { useTransition } from 'react';
import { resolveReport, dismissReport } from '@/lib/actions/admin';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, X, Trash2 } from 'lucide-react';
import type { AdminReport } from '@/lib/queries/admin/getReports';

interface ReportModerationListProps {
  reports: AdminReport[];
}

function ReportCard({ report }: { report: AdminReport }) {
  const [isPending, startTransition] = useTransition();

  const handleResolveAndDelete = () => {
    startTransition(async () => {
      await resolveReport(report.id, true);
    });
  };

  const handleDismiss = () => {
    startTransition(async () => {
      await dismissReport(report.id);
    });
  };

  return (
    <div className="bg-white rounded-xl border border-neutro-200 p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-neutro-900 text-sm">
            Denúncia de {report.reporter_name ?? report.reporter_email}
          </p>
          {report.post_title && (
            <p className="text-xs text-neutro-600 truncate mt-0.5">
              Post: {report.post_title}
            </p>
          )}
          {report.comment_id && (
            <p className="text-xs text-neutro-600 mt-0.5">Comentário denunciado</p>
          )}
        </div>
        <time className="text-xs text-neutro-600 flex-shrink-0 mt-0.5">
          {new Date(report.created_at).toLocaleDateString('pt-BR')}
        </time>
      </div>

      <div className="bg-neutro-50 rounded-lg px-3 py-2">
        <p className="text-xs font-medium text-neutro-600 mb-0.5">Motivo</p>
        <p className="text-sm text-neutro-800">{report.reason}</p>
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          variant="danger"
          onClick={handleResolveAndDelete}
          isLoading={isPending}
          leftIcon={<Trash2 size={14} />}
        >
          Resolver e remover conteúdo
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDismiss}
          isLoading={isPending}
          leftIcon={<ShieldCheck size={14} />}
        >
          Dispensar
        </Button>
        {report.post_slug && (
          <a
            href={`/blog/${report.post_slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-azul-correnteza text-sm hover:underline no-underline"
          >
            <X size={14} />
            Ver post
          </a>
        )}
      </div>
    </div>
  );
}

export function ReportModerationList({ reports }: ReportModerationListProps) {
  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
}

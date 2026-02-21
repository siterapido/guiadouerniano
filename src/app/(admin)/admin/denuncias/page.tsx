import { getReports } from '@/lib/queries/admin/getReports';
import { ReportModerationList } from './ReportModerationList';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Denúncias' };

export default async function AdminDenunciasPage() {
  const reports = await getReports();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Denúncias abertas</h1>
        <p className="text-sm text-neutro-600 mt-1">
          {reports.length === 0
            ? 'Nenhuma denúncia aberta.'
            : `${reports.length} denúncia${reports.length > 1 ? 's' : ''} aguardando revisão`}
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border border-neutro-200 p-12 text-center">
          <p className="text-neutro-600">Tudo em dia! Nenhuma denúncia pendente.</p>
        </div>
      ) : (
        <ReportModerationList reports={reports} />
      )}
    </div>
  );
}

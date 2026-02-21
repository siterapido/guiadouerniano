import { AdminMaterialForm } from '@/components/admin/AdminMaterialForm';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Adicionar material' };

export default function NewMaterialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-neutro-900">Adicionar material</h1>
        <p className="text-sm text-neutro-600 mt-1">
          Adicione um arquivo, link ou vídeo para os membros
        </p>
      </div>
      <AdminMaterialForm />
    </div>
  );
}

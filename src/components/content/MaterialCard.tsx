import { FileText, FileImage, Film, Package, ExternalLink, Download } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/Badge';
import { formatFileSize, formatDate } from '@/lib/utils/format';
import type { Material } from '@/types';

interface MaterialCardProps {
  material: Material;
  className?: string;
}

const typeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  doc: FileText,
  image: FileImage,
  video: Film,
  link: ExternalLink,
};

const typeLabels: Record<string, string> = {
  pdf: 'PDF',
  doc: 'Documento',
  image: 'Imagem',
  video: 'Vídeo',
  link: 'Link',
};

const typeColors: Record<string, string> = {
  pdf: 'bg-red-50 text-[--vermelho-luta] border border-red-100',
  doc: 'bg-blue-50 text-[--azul-correnteza] border border-blue-100',
  image: 'bg-green-50 text-green-700 border border-green-100',
  video: 'bg-purple-50 text-purple-700 border border-purple-100',
  link: 'bg-orange-50 text-[--laranja-energia] border border-orange-100',
};

export function MaterialCard({ material, className }: MaterialCardProps) {
  const Icon = typeIcons[material.file_type] ?? Package;
  const typeLabel = typeLabels[material.file_type] ?? 'Arquivo';
  const typeColor = typeColors[material.file_type] ?? 'bg-[--neutro-100] text-[--neutro-800] border border-[--neutro-200]';
  const isExternal = material.file_type === 'link';

  const linkProps = isExternal
    ? { href: material.file_url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: material.file_url, download: material.title };

  return (
    <div className={cn('bg-white rounded-xl border border-[--neutro-200] p-4 flex items-start gap-4 hover:shadow-md transition-shadow duration-200', className)}>
      <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', typeColor)}>
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-[--neutro-900] text-sm leading-snug truncate">
              {material.title}
            </h3>
            {material.description && (
              <p className="text-xs text-[--neutro-600] mt-1 line-clamp-2">{material.description}</p>
            )}
          </div>
          <Badge variant="outline" className="flex-shrink-0 text-xs">{typeLabel}</Badge>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[--neutro-600]">
            {formatDate(material.created_at)}
            {material.file_size && ` · ${formatFileSize(material.file_size)}`}
          </span>
          <a
            {...linkProps}
            className="inline-flex items-center gap-1 text-xs font-medium text-[--azul-correnteza] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza] rounded"
          >
            {isExternal ? (
              <><ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />Acessar</>
            ) : (
              <><Download className="w-3.5 h-3.5" aria-hidden="true" />Baixar</>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}

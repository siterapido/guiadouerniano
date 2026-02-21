import { cn } from '@/lib/utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getKey: (row: T) => string;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  getKey,
  emptyMessage = 'Nenhum item encontrado.',
  className,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutro-200 p-12 text-center">
        <p className="text-neutro-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-neutro-200 overflow-hidden', className)}>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutro-100 border-b border-neutro-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'text-left px-4 py-3 font-semibold text-neutro-700 whitespace-nowrap',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutro-100">
            {data.map((row) => (
              <tr key={getKey(row)} className="hover:bg-neutro-50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-4 py-3 text-neutro-800', col.className)}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card stack */}
      <div className="md:hidden divide-y divide-neutro-100">
        {data.map((row) => (
          <div key={getKey(row)} className="p-4 space-y-2">
            {columns.map((col) => (
              <div key={col.key} className={cn('flex justify-between gap-2', col.hideOnMobile && 'hidden')}>
                <span className="text-xs font-medium text-neutro-600 flex-shrink-0">{col.header}</span>
                <span className="text-sm text-neutro-900 text-right">{col.render(row)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

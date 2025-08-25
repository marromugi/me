import { MarkdownTableCellProps } from './type';
import { clsx } from 'clsx';

export const MarkdownTableCell = ({
  //node,
  isHeader,
  children,
}: MarkdownTableCellProps) => {
  const CellTag = isHeader ? 'th' : 'td';
  const cellClass = isHeader
    ? 'px-4 py-3 text-left font-semibold min-w-40 '
    : 'px-4 py-3 min-w-40';

  return (
    <CellTag
      className={clsx(
        'border-r border-gray-300 last:border-0',
        cellClass,
        isHeader
          ? 'bg-gray-100 text-gray-800 font-semibold text-sm'
          : '',
      )}
    >
      {children}
    </CellTag>
  );
};

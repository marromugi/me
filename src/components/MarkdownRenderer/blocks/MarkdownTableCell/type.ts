import { TableCell } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownTableCellProps = {
  node: TableCell;
  isHeader: boolean;
  index: number;
  children?: ReactNode;
};

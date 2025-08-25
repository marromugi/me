import { TableRow } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownTableRowProps = {
  node: TableRow;
  index: number;
  children?: ReactNode;
};
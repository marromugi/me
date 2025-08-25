import { Table } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownTableProps = {
  node: Table;
  children?: ReactNode;
};
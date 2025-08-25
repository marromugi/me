import { List } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownListProps = {
  node: List;
  children?: ReactNode;
};
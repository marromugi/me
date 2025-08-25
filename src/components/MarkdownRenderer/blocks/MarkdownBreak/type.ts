import { Break } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownBreakProps = {
  node: Break;
  children?: ReactNode;
};
import { ThematicBreak } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownThematicBreakProps = {
  node: ThematicBreak;
  children?: ReactNode;
};
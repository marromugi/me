import { Emphasis } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownEmphasisProps = {
  node: Emphasis;
  children?: ReactNode;
};
import { Blockquote } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownBlockquoteProps = {
  node: Blockquote;
  children?: ReactNode;
};
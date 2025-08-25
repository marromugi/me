import { Code } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownCodeProps = {
  node: Code;
  children?: ReactNode;
};
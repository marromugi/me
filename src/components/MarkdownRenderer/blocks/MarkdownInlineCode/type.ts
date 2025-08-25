import { InlineCode } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownInlineCodeProps = {
  node: InlineCode;
  children?: ReactNode;
};
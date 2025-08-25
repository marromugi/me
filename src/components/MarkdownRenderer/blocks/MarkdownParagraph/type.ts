import { Paragraph } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownParagraphProps = {
  node: Paragraph;
  children?: ReactNode;
};
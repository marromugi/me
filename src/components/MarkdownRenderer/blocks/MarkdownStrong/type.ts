import { Strong } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownStrongProps = {
  node: Strong;
  children?: ReactNode;
};
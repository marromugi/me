import { Heading } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownHeadingProps = {
  node: Heading;
  children?: ReactNode;
};
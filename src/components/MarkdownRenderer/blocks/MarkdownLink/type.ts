import { Link } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownLinkProps = {
  node: Link;
  children?: ReactNode;
};
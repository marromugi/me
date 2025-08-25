import { Text } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownTextProps = {
  node: Text;
  children?: ReactNode;
};
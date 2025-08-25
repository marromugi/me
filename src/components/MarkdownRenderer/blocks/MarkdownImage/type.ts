import { Image } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownImageProps = {
  node: Image;
  children?: ReactNode;
};
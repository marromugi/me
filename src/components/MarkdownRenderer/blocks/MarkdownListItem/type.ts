import { ListItem } from 'mdast';
import { ReactNode } from 'react';

export type MarkdownListItemProps = {
  node: ListItem;
  children?: ReactNode;
};
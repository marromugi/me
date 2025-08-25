import { createElement } from 'react';
import { MarkdownHeadingProps } from './type';
import clsx from 'clsx';

export const MarkdownHeading = ({
  node,
  children,
}: MarkdownHeadingProps) => {
  const headingClass = {
    1: 'text-3xl font-bold mb-6',
    2: 'text-2xl font-bold mb-6 mt-18',
    3: 'text-xl font-semibold mb-6 mt-14',
    4: 'text-lg font-semibold mb-4 mt-10',
    5: 'text-base font-medium mb-4',
    6: 'text-base font-medium mb-1',
  };

  return createElement(
    `h${node.depth}`,
    { className: clsx(headingClass[node.depth], 'font-title') },
    children,
  );
};

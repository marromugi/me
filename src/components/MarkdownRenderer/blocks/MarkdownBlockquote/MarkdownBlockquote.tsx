import { MarkdownBlockquoteProps } from './type';

export const MarkdownBlockquote = ({
  //node,
  children,
}: MarkdownBlockquoteProps) => {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700">
      {children}
    </blockquote>
  );
};

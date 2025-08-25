import { MarkdownParagraphProps } from './type';

export const MarkdownParagraph = ({
  //node,
  children,
}: MarkdownParagraphProps) => {
  return (
    <p className="my-4 leading-relaxed whitespace-pre-wrap">
      {children}
    </p>
  );
};

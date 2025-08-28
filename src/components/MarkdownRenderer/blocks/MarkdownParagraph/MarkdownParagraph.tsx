import { MarkdownParagraphProps } from './type';

export const MarkdownParagraph = ({
  //node,
  children,
}: MarkdownParagraphProps) => {
  return (
    <p className="my-4 leading-[1.875em] whitespace-pre-wrap">
      {children}
    </p>
  );
};

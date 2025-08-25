import { MarkdownEmphasisProps } from './type';

export const MarkdownEmphasis = ({
  //node,
  children,
}: MarkdownEmphasisProps) => {
  return <em className="italic">{children}</em>;
};

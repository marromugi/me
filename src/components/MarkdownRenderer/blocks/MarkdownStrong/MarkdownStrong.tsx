import { MarkdownStrongProps } from './type';

export const MarkdownStrong = ({
  //node,
  children,
}: MarkdownStrongProps) => {
  return <strong className="font-bold">{children}</strong>;
};

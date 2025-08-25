import { MarkdownTextProps } from './type';

export const MarkdownText = ({ node }: MarkdownTextProps) => {
  return <>{node.value}</>;
};
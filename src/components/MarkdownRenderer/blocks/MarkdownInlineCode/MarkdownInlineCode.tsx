import { MarkdownInlineCodeProps } from './type';

export const MarkdownInlineCode = ({ node }: MarkdownInlineCodeProps) => {
  return (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
      {node.value}
    </code>
  );
};
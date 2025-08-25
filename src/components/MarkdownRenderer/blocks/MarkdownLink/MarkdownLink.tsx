import { MarkdownLinkProps } from './type';

export const MarkdownLink = ({ node, children }: MarkdownLinkProps) => {
  return (
    <a
      href={node.url}
      title={node.title || undefined}
      className="text-gray-800 hover:text-orange-600 hover:decoration-orange-600 underline decoration-gray-200 transition-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

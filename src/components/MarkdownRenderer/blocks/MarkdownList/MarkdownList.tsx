import { MarkdownListProps } from './type';

export const MarkdownList = ({ node, children }: MarkdownListProps) => {
  const ListTag = node.ordered ? 'ol' : 'ul';
  const listClass = node.ordered
    ? 'list-decimal list-inside mb-4 space-y-0'
    : 'list-disc list-inside mb-4 space-y-0';

  return (
    <ListTag
      className={listClass}
      style={{
        listStylePosition: 'outside',
        paddingLeft: '16px',
      }}
    >
      {children}
    </ListTag>
  );
};

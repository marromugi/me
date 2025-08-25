import clsx from 'clsx';
import { MarkdownTableProps } from './type';

export const MarkdownTable = ({
  //node,
  children,
}: MarkdownTableProps) => {
  return (
    <div
      className={clsx(
        'overflow-x-auto my-4',
        'border rounded-md border-gray-200',
      )}
    >
      <table className="min-w-full border-collapse">{children}</table>
    </div>
  );
};

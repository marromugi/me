import { Suspense } from 'react';
import { MarkdownCode } from './MarkdownCode';
import { MarkdownCodeProps } from './type';

const MarkdownCodeFallback = ({ node }: MarkdownCodeProps) => {
  return (
    <pre className="bg-gray-900 rounded-md p-4 overflow-x-auto mb-4">
      <code className="text-gray-300">{node.value}</code>
    </pre>
  );
};

export const MarkdownCodeWrapper = (props: MarkdownCodeProps) => {
  return (
    <Suspense fallback={<MarkdownCodeFallback {...props} />}>
      <MarkdownCode {...props} />
    </Suspense>
  );
};
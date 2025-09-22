import { highlightCode } from '@/libs/shiki';
import { MarkdownCodeProps } from './type';

export const MarkdownCode = async ({ node }: MarkdownCodeProps) => {
  let highlightedCode: string;

  try {
    highlightedCode = await highlightCode(
      node.value || '',
      node.lang || 'plaintext',
      'github-dark',
    );
  } catch (error) {
    console.error('Failed to highlight code:', error);
    // Fallback to plain code with basic styling
    highlightedCode = `<pre class="shiki github-dark" style="background-color: #0d1117; overflow-x: auto;"><code>${node.value}</code></pre>`;
  }

  return (
    <div
      className="mb-4 w-full overflow-hidden rounded-xl text-sm [&>pre]:p-4 [&>pre]:overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

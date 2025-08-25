'use client';

import { useState } from 'react';
import { MarkdownImageProps } from './type';
import clsx from 'clsx';

export const MarkdownImage = ({ node }: MarkdownImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <span
        className={clsx(
          'block my-4 p-4 rounded-md bg-gray-100',
          'text-sm text-gray-600',
        )}
      >
        📷 {node.alt ?? '画像が見つかりませんでした'}
      </span>
    );
  }

  return (
    <img
      src={node.url}
      alt={node.alt || ''}
      title={node.title || undefined}
      loading="lazy"
      className={`h-auto rounded ${isLoading ? 'opacity-0 blur-xl' : 'opacity-100 blur-none'} my-4 transition-opacity duration-300`}
      onLoad={() => setIsLoading(false)}
      onError={() => {
        setIsError(true);
      }}
    />
  );
};

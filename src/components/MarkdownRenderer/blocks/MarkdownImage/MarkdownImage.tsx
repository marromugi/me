'use client';

import { useEffect, useRef, useState } from 'react';
import { MarkdownImageProps } from './type';
import clsx from 'clsx';
import { Flex } from '@/components/layouts/Flex';

export const MarkdownImage = ({ node }: MarkdownImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // 画像が読み込まれたら、loadingを解除する
    if (!isLoading) return;

    const interval: NodeJS.Timeout = setInterval(() => {
      if (ref.current?.complete) {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [ref.current]);

  if (isError) {
    return (
      <span
        className={clsx(
          'block my-6 p-4 rounded-md bg-gray-100',
          'text-sm text-gray-600',
        )}
      >
        📷 {node.alt ?? '画像が見つかりませんでした'}
      </span>
    );
  }

  return (
    <Flex center>
      <img
        ref={ref}
        src={node.url}
        alt={node.alt || ''}
        title={node.title || undefined}
        loading="lazy"
        className={clsx(
          'h-auto rounded-lg',
          isLoading ? 'opacity-0 blur-xl' : 'opacity-100 blur-none',
          'my-6 transition-opacity duration-300 max-h-[60vh] text-center',
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsError(true);
        }}
      />
    </Flex>
  );
};

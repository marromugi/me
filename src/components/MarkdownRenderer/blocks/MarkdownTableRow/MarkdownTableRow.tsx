'use client';

import { useEffect, useRef, useState } from 'react';
import { MarkdownTableRowProps } from './type';
import clsx from 'clsx';

export const MarkdownTableRow = ({
  //node,
  index,
  children,
}: MarkdownTableRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [isHidden, setHidden] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (ref.current.textContent === '') {
      setHidden(true);
    }
  }, []);

  if (index === 0) {
    return (
      <tr
        className={clsx(
          'border-b border-gray-200 last:border-b-0',
          isHidden && 'hidden',
        )}
        ref={ref}
      >
        {children}
      </tr>
    );
  }

  return (
    <tr
      className={clsx(
        'border-b border-gray-200 last:border-b-0',
        isHidden && 'hidden',
      )}
      ref={ref}
    >
      {children}
    </tr>
  );
};

import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const FLEX_VARIANTS = tv({
  base: clsx('flex'),
  variants: {
    direction: {
      column: clsx('flex-col'),
      row: clsx('flex-row')
    },
    gap: {
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      7: 'gap-7',
      8: 'gap-8'
    },
    justify: {
      center: clsx('justify-center'),
      between: clsx('justify-between'),
      end: clsx('justify-end')
    },
    align: {
      center: clsx('items-center'),
      baseline: clsx('items-baseline'),
      start: clsx('items-start'),
      end: clsx('items-end')
    },
    center: {
      true: clsx('items-center justify-center')
    },
    wrap: {
      true: clsx('flex-wrap'),
      false: clsx('flex-nowrap')
    }
  }
})

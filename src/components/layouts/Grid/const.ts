import clsx from 'clsx'
import { tv } from 'tailwind-variants'

export const GRID_VARIANTS = tv({
  base: clsx('grid'),
  variants: {
    column: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8'
    },
    row: {
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
      7: 'grid-rows-7',
      8: 'grid-rows-8'
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
    }
  }
})

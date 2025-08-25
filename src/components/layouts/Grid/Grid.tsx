import { ElementType, createElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { GRID_VARIANTS } from './const'
import { GridProps } from './type'

export const Grid = <T extends ElementType>({
  as,
  gap,
  justify,
  align,
  center,
  column,
  row,
  ...props
}: GridProps<T>) => {
  return createElement(as ?? 'div', {
    ...props,
    className: twMerge(
      GRID_VARIANTS({ column, row, gap, center, align, justify }),
      props.className
    )
  })
}

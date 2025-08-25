import { ComponentPropsWithoutRef, ElementType } from 'react'
import { VariantProps } from 'tailwind-variants'

import { GRID_VARIANTS } from './const'

export type GridProps<T extends ElementType> = VariantProps<
  typeof GRID_VARIANTS
> &
  ComponentPropsWithoutRef<T> & {
    as?: T
  }

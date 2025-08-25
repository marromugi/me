import { ComponentPropsWithoutRef, ElementType } from 'react'
import { VariantProps } from 'tailwind-variants'

import { FLEX_VARIANTS } from './const'

export type FlexProps<T extends ElementType = 'div'> = VariantProps<
  typeof FLEX_VARIANTS
> &
  ComponentPropsWithoutRef<T> & {
    as?: T
  }

import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] px-4',
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-primary)] text-white hover:opacity-90 focus-visible:ring-[var(--color-primary)]',
        destructive: 'bg-[var(--color-error)] text-white hover:opacity-90 focus-visible:ring-[var(--color-error)]',
        outline: 'border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] focus-visible:ring-[var(--color-primary)]',
        secondary: 'bg-white text-[var(--color-primary)] hover:opacity-90 focus-visible:ring-white',
        ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-muted)] hover:text-[var(--color-text)] focus-visible:ring-[var(--color-primary)]',
        link: 'underline-offset-4 hover:underline text-[var(--color-primary)] focus-visible:ring-[var(--color-primary)] min-h-0 px-0'
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-3 text-xs min-h-[36px]',
        lg: 'h-12 px-8 text-base',
        icon: 'h-11 w-11 px-0'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
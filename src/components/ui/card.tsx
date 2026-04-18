import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn('rounded-xl border p-0 overflow-hidden', className)}
      style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('px-6 pt-6 pb-0', className)}>{children}</div>
}

function CardTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h3 className={cn('font-semibold leading-none', className)} style={{ color: 'var(--color-text)' }}>
      {children}
    </h3>
  )
}

function CardContent({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('px-6 py-6', className)}>{children}</div>
}

export { Card, CardHeader, CardTitle, CardContent }

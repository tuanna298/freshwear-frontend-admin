import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface LayoutProps {
	children: ReactNode
	className?: string
}

const FormLayout = ({ children, className }: LayoutProps) => (
	<div className={cn('grid gap-2 xs:gap-4', className)}>{children}</div>
)

const FormItemLayout = ({ children, className }: LayoutProps) => (
	<div className={cn('grid gap-2', className)}>{children}</div>
)

export { FormItemLayout, FormLayout }

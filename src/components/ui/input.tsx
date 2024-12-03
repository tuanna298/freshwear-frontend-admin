import { cn } from '@/lib/utils'
import * as React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	isError?: boolean
	icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, isError, icon, ...props }, ref) => {
		return (
			<div className={cn('relative flex items-center', className)}>
				<span className="absolute left-2">{icon}</span>
				<input
					type={type}
					spellCheck={false}
					className={cn(
						'flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0',
						'file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:text-muted-foreground focus-visible:outline-none',
						'focus-visible:ring-1',
						isError
							? 'border-destructive focus-visible:ring-destructive'
							: 'focus-visible:ring-ring',
						'disabled:cursor-not-allowed disabled:opacity-50',
						className,
						icon && 'pl-8',
					)}
					ref={ref}
					autoComplete="one-time-code"
					{...props}
				/>
			</div>
		)
	},
)
Input.displayName = 'Input'

export { Input }

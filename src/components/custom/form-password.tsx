import { Eye, EyeOff } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { cn } from '@/lib/utils'
import { Input, InputProps } from '../ui/input'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form'
import RequiredDot from './required-dot'

type Props = InputProps & {
	id: string
	label?: ReactNode
	description?: ReactNode
	required?: boolean
}

const ToggleSpan = ({
	type,
	onClick,
}: {
	type: 'text' | 'password'
	onClick: () => void
}) => (
	<span
		className="float-right -translate-x-2 -translate-y-8 cursor-pointer select-none"
		onClick={onClick}
		onKeyDown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				onClick?.()
			}
		}}
		role="button"
		tabIndex={0}
	>
		{type === 'password' ? <EyeOff height={16} /> : <Eye height={16} />}
	</span>
)

export function FormPassword({
	id,
	description,
	label,
	required,
	...inputProps
}: Props) {
	const [type, setType] = useState<'text' | 'password'>('password')
	const form = useFormContext()
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel className="space-x-1">
							{required && <RequiredDot />}
							<span>{label}</span>
						</FormLabel>
					)}
					<FormControl>
						<Input
							autoComplete="true"
							type={type}
							className={cn('pr-10', inputProps.className)}
							{...inputProps}
							{...field}
						/>
					</FormControl>
					<ToggleSpan
						type={type}
						onClick={() =>
							setType((prev) => (prev === 'text' ? 'password' : 'text'))
						}
					/>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

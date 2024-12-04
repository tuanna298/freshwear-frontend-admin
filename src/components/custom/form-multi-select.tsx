import { ReactNode, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form'
import { MultiSelect, MultiSelectProps } from './multi-select'
import RequiredDot from './required-dot'

type Props = {
	id: string
	label?: ReactNode
	description?: ReactNode
	onChangeCallback?: (value: string[]) => void
	required?: boolean
} & Omit<MultiSelectProps, 'onValueChange'>

export function FormMultiSelect({
	id,
	description,
	label,
	onChangeCallback,
	required,
	...multiSelectProps
}: Props) {
	const form = useFormContext()
	const multiSelectRef = useRef<HTMLDivElement>(null)
	const [overlayWidth, setOverlayWidth] = useState<string | number>('auto')

	useEffect(() => {
		if (multiSelectRef.current) {
			setOverlayWidth(multiSelectRef.current.offsetWidth)
		}
	}, [multiSelectRef.current?.offsetWidth])

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="min-w-max space-x-1">
						{required && <RequiredDot />}
						<span>{label}</span>
					</FormLabel>
					<FormControl>
						<MultiSelect
							onValueChange={(value) => {
								field.onChange(value)
								onChangeCallback?.(value)
							}}
							value={field.value}
							{...multiSelectProps}
							overlayStyle={{ minWidth: overlayWidth }}
						/>
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

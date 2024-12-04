import { ReactNode, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Textarea, TextareaProps } from '../ui/textarea'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form'

type Props = TextareaProps & {
	id: string
	label?: ReactNode
	description?: ReactNode
}

export function FormTextarea({
	id,
	label,
	description,
	...textareaProps
}: Props) {
	const form = useFormContext()
	useEffect(() => {
		form.setValue(id, textareaProps.defaultValue)
	}, [textareaProps.defaultValue])
	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel>
							{label}
							{textareaProps?.required}
						</FormLabel>
					)}
					<FormControl>
						<Textarea {...textareaProps} {...field} />
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

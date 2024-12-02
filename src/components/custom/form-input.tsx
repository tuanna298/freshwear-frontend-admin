import { ReactNode, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, InputProps } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './form'
import RequiredDot from './required-dot'

export type FormInputProps = InputProps & {
	id: string
	label?: ReactNode
	description?: ReactNode
	popupMessage?: boolean
	required?: boolean
}

export function FormInput({
	id,
	description,
	label,
	popupMessage = false,
	required,
	...inputProps
}: FormInputProps) {
	const form = useFormContext()

	useEffect(() => {
		form.setValue(id, inputProps.defaultValue)
	}, [inputProps.defaultValue])

	return (
		<FormField
			control={form.control}
			name={id}
			defaultValue={inputProps.defaultValue}
			render={({ field, fieldState: { error } }) => (
				<Popover open={!!error}>
					<FormItem>
						{label && (
							<FormLabel className="space-x-1">
								{required && <RequiredDot />}
								<span>{label}</span>
							</FormLabel>
						)}
						<PopoverTrigger className="w-full">
							<FormControl>
								<Input autoComplete="true" {...inputProps} {...field} />
							</FormControl>
						</PopoverTrigger>
						{description && <FormDescription>{description}</FormDescription>}
					</FormItem>
					{!popupMessage ? (
						<FormMessage />
					) : (
						<PopoverContent
							side="bottom"
							className="w-fit p-1 px-2 shadow-none"
						>
							<svg
								width={10}
								height={5}
								viewBox="0 0 30 10"
								className="absolute -top-[4px] right-[49%]"
							>
								<line
									x1="0"
									y1="15"
									x2="15"
									y2="0"
									className="stroke-border"
									strokeWidth={'3'}
								/>
								<line
									x1="30"
									y1="15"
									x2="15"
									y2="0"
									className="stroke-border"
									strokeWidth={'3'}
								/>
								<line
									x1="5"
									y1="11"
									x2="25"
									y2="11"
									className="stroke-white dark:stroke-popover"
									strokeWidth={'3'}
								/>
							</svg>
							<FormMessage />
						</PopoverContent>
					)}
				</Popover>
			)}
		/>
	)
}

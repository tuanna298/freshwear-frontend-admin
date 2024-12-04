import { ReactNode } from 'react'

import RequiredDot from '../custom/required-dot'
import { FormControl, FormItem, FormLabel, FormMessage } from './form'

type Props<ComponentProps = any> = {
	field: any
	label?: ReactNode
	required?: boolean
	Component: any
	componentProps?: ComponentProps
}
export default function FormItemControl<ComponentProps = any>({
	label,
	field,
	required,
	Component,
	componentProps,
}: Props<ComponentProps>) {
	if (!Component) {
		return null
	}
	return (
		<FormItem {...field}>
			<FormLabel className="space-x-1">
				{required && <RequiredDot />}
				<span>{label}</span>
			</FormLabel>
			<FormControl>
				<Component {...field} {...(componentProps ?? {})} />
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}

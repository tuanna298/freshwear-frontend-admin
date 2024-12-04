import { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField } from './form'
import FormItemControl from './form-item'
import HttpCombobox, { HttpComboboxProps } from './http-combobox'

type Props = HttpComboboxProps & {
	id: string
	label?: ReactNode
	required?: boolean
}

export default function FormSelect(props: Props) {
	const { id, label, required, ...restProps } = props
	const form = useFormContext()

	return (
		<FormField
			control={form.control}
			name={id}
			render={({ field }) => (
				<FormItemControl
					required={required}
					label={label}
					field={field}
					Component={HttpCombobox}
					componentProps={{ ...restProps }}
				/>
			)}
		/>
	)
}

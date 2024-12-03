import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'
import { FormHTMLAttributes, ReactNode, useCallback, useEffect } from 'react'
import {
	DefaultValues,
	SubmitHandler,
	UseFormProps,
	UseFormReturn,
	useForm,
} from 'react-hook-form'
import { z } from 'zod'
import { AppToast } from '../ui/toast'
import { Form } from './form'

export type FormContainerProps<T extends BaseDTO> = Omit<
	FormHTMLAttributes<HTMLFormElement>,
	'onSubmit'
> & {
	schema: z.ZodObject<z.ZodRawShape>
	transformSchema?: z.ZodEffects<z.ZodTypeAny>
	children: ReactNode
	id: string
	onSubmit?: (data: T) => void
	formProps?: Omit<UseFormProps<T>, 'resolver' | 'defaultValues'> & {
		defaultValues: Partial<T>
	}
	checkDirtyFields?: boolean
	form?: UseFormReturn<any, any, any>
}

const FormContainer = <T extends BaseDTO>({
	schema,
	id,
	children,
	onSubmit: onSubmitProps,
	formProps,
	transformSchema,
	checkDirtyFields = true,
	form: formProp,
	...rest
}: FormContainerProps<T>) => {
	const defaultValues: DefaultValues<T> = {
		...(ZodUtil.getDefaults(schema) as DefaultValues<T>),
		...(formProps?.defaultValues as DefaultValues<T>),
	}

	const form =
		formProp ||
		useForm<z.input<typeof schema>>({
			mode: 'all',
			resolver: zodResolver(schema),
			...formProps,
		})

	const onSubmit: SubmitHandler<z.ZodRawShape> = useCallback(
		(data) => {
			if (checkDirtyFields && isEmpty(form.formState.dirtyFields)) {
				AppToast.info('Không có thay đổi', {
					description: 'Chưa ghi nhận dữ liệu thay đổi!',
				})
				return
			}
			if (onSubmitProps) {
				if (transformSchema) {
					onSubmitProps(transformSchema.parse(data))
				} else {
					onSubmitProps(data as unknown as T)
				}
			} else if (import.meta.env.MODE === 'development') {
				AppToast.info('You submitted the following values: (dev only)', {
					description: (
						<pre className="mt-2 w-[400px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{JSON.stringify(data, null, 2)}
							</code>
						</pre>
					),
				})
			}
		},
		[
			onSubmitProps,
			transformSchema,
			checkDirtyFields,
			form.formState.dirtyFields,
		],
	)

	useEffect(() => {
		return form.reset(defaultValues)
	}, [])

	return (
		<Form {...form}>
			<form
				id={id}
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					return form.handleSubmit(onSubmit)(e)
				}}
				noValidate
				{...rest}
			>
				{children}
			</form>
		</Form>
	)
}

export default FormContainer

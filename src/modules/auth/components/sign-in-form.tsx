import { Form } from '@/components/custom/form'
import { FormInput } from '@/components/custom/form-input'
import { FormPassword } from '@/components/custom/form-password'
import { Button } from '@/components/ui/button'
import {
	SIGN_IN_FIELDS,
	signInDefaultValues,
	signInSchema,
} from '@/schemas/auth/user.schema'
import { FormItemLayout, FormLayout } from '@/shared/layouts/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@refinedev/core'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AUTH_FORM_KEYS } from '../common/constants'

type LoginVariables = {
	username: string
	password: string
}

const { SIGN_IN } = AUTH_FORM_KEYS

const SignInForm = () => {
	const form = useForm<z.input<typeof signInSchema>>({
		mode: 'onChange',
		resolver: zodResolver(signInSchema),
		defaultValues: signInDefaultValues,
	})

	const { mutate: login, isLoading } = useLogin<LoginVariables>()

	const { handleSubmit } = form
	return (
		<Form {...form}>
			<form
				id={SIGN_IN}
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()

					return handleSubmit((data) => login(data))(e)
				}}
				noValidate
			>
				<FormLayout>
					<FormItemLayout>
						<FormInput
							id={SIGN_IN_FIELDS.username}
							label="Tên đăng nhập"
							tabIndex={1}
							required
						/>
					</FormItemLayout>
					<FormItemLayout>
						<FormPassword
							id={SIGN_IN_FIELDS.password}
							placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
							label="Mật khẩu"
							tabIndex={2}
							defaultValue=""
							className="w-full"
							required
						/>
					</FormItemLayout>
					<Button
						type="submit"
						className="w-full uppercase xs:text-lg"
						tabIndex={4}
						disabled={isLoading}
						isLoading={isLoading}
					>
						Đăng nhập
					</Button>
				</FormLayout>
			</form>
		</Form>
	)
}

export default SignInForm

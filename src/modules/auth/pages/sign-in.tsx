import SignInForm from '../components/sign-in-form'
import AuthFormLayout from '../layouts/auth-form-layout'


const SignIn = () => {

	return (
		<AuthFormLayout
			title="Đăng nhập"
			description="Đăng nhập để sử dụng hệ thống"
		>
			<SignInForm />
		</AuthFormLayout>
	)
}

export default SignIn
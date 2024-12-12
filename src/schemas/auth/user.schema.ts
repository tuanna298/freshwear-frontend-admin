import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'

export enum UserGender {
	MALE,
	FEMALE,
}

export const userSchema = z.object({
	id: z.string().optional().nullable(),
	full_name: z
		.string({
			required_error: 'Vui lòng nhập họ tên',
		})
		.min(1, 'Vui lòng nhập họ tên'),
	email: z
		.string({
			required_error: 'Vui lòng nhập email',
		})
		.min(1, 'Vui lòng nhập email')
		.email({ message: 'Email không hợp lệ' })
		.optional(),
	username: z
		.string({
			required_error: 'Vui lòng nhập tên đăng nhập',
		})
		.min(1, 'Vui lòng nhập tên đăng nhập')
		.optional(),
	password: z
		.string({
			required_error: 'Vui lòng nhập mật khẩu',
		})
		.min(1, 'Vui lòng nhập mật khẩu')
		.optional(),
	phone_number: z.string().optional().nullable(),
	gender: z.nativeEnum(UserGender).optional().nullable(),
	avatar: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	last_login: z.date().optional().nullable(),
	created_at: z.date().optional().nullable(),
	updated_at: z.date().optional().nullable(),
})

export const signInSchema = userSchema
	.pick({
		username: true,
		password: true,
	})
	.required()

export const updateProfileSchema = userSchema.pick({
	full_name: true,
	phone_number: true,
	gender: true,
	address: true,
	avatar: true,
})

export const changePasswordSchema = z
	.object({
		current_password: z
			.string({
				required_error: 'Vui lòng nhập mật khẩu hiện tại',
			})
			.min(1, 'Vui lòng nhập mật khẩu hiện tại'),
		new_password: z
			.string({
				required_error: 'Vui lòng nhập mật khẩu mới',
			})
			.min(1, 'Vui lòng nhập mật khẩu mới'),
		confirm_password: z
			.string({
				required_error: 'Vui lòng xác nhận mật khẩu',
			})
			.min(1, 'Vui lòng xác nhận mật khẩu'),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: 'Mật khẩu xác nhận không khớp',
		path: ['confirm_password'],
	})

export const signInDefaultValues = ZodUtil.getDefaults(signInSchema)
export const userDefaultValues = ZodUtil.getDefaults(userSchema)
export const updateProfileDefaultValues =
	ZodUtil.getDefaults(updateProfileSchema)
export const changePasswordDefaultValues = ZodUtil.getDefaults(
	changePasswordSchema._def.schema,
)

export type User = BaseDTO & z.infer<typeof userSchema>
export type SignInDto = z.infer<typeof signInSchema>
export type UpdateProfileDto = BaseDTO & z.infer<typeof updateProfileSchema>
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>

export const SIGN_IN_FIELDS = signInSchema.keyof().enum
export const USER_FIELDS = userSchema.keyof().enum
export const CHANGE_PASSWORD_FIELDS =
	changePasswordSchema._def.schema.keyof().enum

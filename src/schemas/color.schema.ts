import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'

export const colorSchema = z.object({
	id: z.string().optional().nullable().or(z.number().optional().nullable()),
	name: z
		.string({
			required_error: 'Vui lòng nhập tên màu',
		})
		.min(1, 'Vui lòng nhập tên màu'),
	code: z
		.string({
			required_error: 'Vui lòng chọn mã màu',
		})
		.min(1, 'Vui lòng chọn mã màu'),
})

export const colorDefaultValues = ZodUtil.getDefaults(colorSchema)
export type Color = BaseDTO & z.infer<typeof colorSchema>

export const COLOR_FIELDS = colorSchema.keyof().enum

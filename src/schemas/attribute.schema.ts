import ZodUtil from '@/lib/zod.util'
import { BaseDTO } from '@/shared/common/interfaces'
import { z } from 'zod'

export const attributeSchema = z.object({
	id: z.string().optional().nullable(),
	name: z
		.string({
			required_error: 'Vui lòng nhập tên thuộc tính',
		})
		.min(1, 'Vui lòng nhập tên thuộc tính'),
})

export const attributeDefaultValues = ZodUtil.getDefaults(attributeSchema)
export type Attribute = BaseDTO & z.infer<typeof attributeSchema>

export const ATTRIBUTE_FIELDS = attributeSchema.keyof().enum

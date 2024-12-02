import { z } from 'zod'

export default class ZodUtil {
	// get default values from zod schema
	static getDefaults<T extends z.AnyZodObject>(schema: T) {
		return Object.fromEntries(
			Object.entries(schema.shape).map(([key, value]) => {
				if (value instanceof z.ZodDefault)
					return [key, value._def.defaultValue()]
				return [key, undefined]
			}),
		)
	}
}

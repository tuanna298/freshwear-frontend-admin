import { Color } from '@/schemas/color.schema'
import BaseApi from '@/shared/apis/base.api'
import { API_PATHS } from '@/shared/common/constants'

const {
	COLOR: { BASE },
} = API_PATHS

class ColorApi extends BaseApi<Color> {}

export default new ColorApi(BASE)

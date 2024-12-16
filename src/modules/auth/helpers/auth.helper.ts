import { API_PATHS } from '@/shared/common/constants'
import httpConfig from '@/shared/configs/http.config'
import mem from 'mem'
import { RefreshBody } from '../common/types'
import { useAuthStore } from '../stores/use-auth-store'

export const refreshTokenFnMaxAge = 10000 // 10s

const {
	AUTH: { REFRESH },
} = API_PATHS

class AuthHelper {
	static refreshTokenFn: () => Promise<string> = mem(
		async () => {
			try {
				const { refreshToken, setAccessToken } = useAuthStore.getState()
				const {
					data: { access_token },
				} = await httpConfig.post(REFRESH, {
					refresh_token: refreshToken,
				} as RefreshBody)
				if (access_token) {
					setAccessToken(access_token)
				}
				return access_token
			} catch (error) {
				console.error('Failed to refresh token:', error)
				throw new Error('Failed to refresh token')
			}
		},
		{ maxAge: refreshTokenFnMaxAge },
	)

	static defaultAuthStore = {}
}

export default AuthHelper

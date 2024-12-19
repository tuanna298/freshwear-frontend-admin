import { handleError } from '@/lib/axios.util'
import authApi from '@/modules/auth/apis/auth.api'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import { ROUTE_PATHS } from '@/shared/common/constants'
import { AuthProvider } from '@refinedev/core'

const { ROOT, SIGN_IN } = ROUTE_PATHS

export default {
	login: async ({ username, password }) => {
		const { setAccessToken, setRefreshToken, clear } = useAuthStore.getState()
		try {
			const {
				data: { access_token, refresh_token },
			} = await authApi.signIn({
				username,
				password,
			})

			setAccessToken(access_token)
			setRefreshToken(refresh_token)

			return Promise.resolve({
				success: true,
				redirectTo: ROOT,
				successNotification: {
					message: 'Chào mừng bạn quay trở lại!',
				},
			})
		} catch (error) {
			clear()
			const { errorMessage, errorDescription } = handleError(error)

			return Promise.resolve({
				success: false,
				error: {
					message: errorDescription,
					name: errorMessage,
				},
			})
		}
	},
	logout: async () => {
		const { accessToken, clear } = useAuthStore.getState()
		try {
			authApi.signOut({
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		} catch (error) {
			console.error('Error logging out in server', error)
		} finally {
			clear()
		}

		return {
			success: true,
			redirectTo: SIGN_IN,
		}
	},
	check: async () => {
		return {
			authenticated: false,
			redirectTo: SIGN_IN,
		}
	},
	getPermissions: async () => null,
	getIdentity: async () => {
		const { accessToken } = useAuthStore.getState()
		if (!accessToken) return null

		try {
			return (await authApi.getProfile()).data
		} catch (error) {
			console.error('Error fetching user identity', error)
			return null
		}
	},

	onError: async (error) => {
		return { error }
	},
} as AuthProvider

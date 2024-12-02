export const NODE_ENV = import.meta.env.NODE_ENV
export const API_URL = import.meta.env.VITE_BASE_API_URL
export const APP_NAME = import.meta.env.VITE_APP_NAME

export const API_PATHS = {
	AUTH: {
		BASE: '/auth',
		SIGN_IN: '/sign-in',
		SIGN_OUT: '/sign-out',
		ME: {
			BASE: '/me',
			UPDATE_PROFILE: '/me/update-profile',
			CHANGE_PASSWORD: '/me/change-password',
		},
	},
	USER: {
		BASE: '/user',
	},
}
export const ROUTE_PATHS = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	USER: '/user',
}

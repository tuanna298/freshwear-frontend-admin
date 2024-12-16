export type AuthTokens = {
	access_token: string
	refresh_token: string
}

export type RefreshBody = {
	refresh_token?: string
}

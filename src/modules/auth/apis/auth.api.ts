import {
	ChangePasswordDto,
	SignInDto,
	UpdateProfileDto,
	User,
} from '@/schemas/auth/user.schema'
import { API_PATHS } from '@/shared/common/constants'
import { BaseResponse } from '@/shared/common/interfaces'
import http from '@/shared/configs/http.config'
import { AxiosRequestConfig } from 'axios'
import { AuthTokens } from '../common/types'

const {
	AUTH: {
		BASE,
		SIGN_IN,
		SIGN_OUT,
		ME: { BASE: ME, UPDATE_PROFILE, CHANGE_PASSWORD },
	},
} = API_PATHS

class AuthApi {
	constructor(public path: string) {}

	private buildUrl(endpoint: string): string {
		return this.path + endpoint
	}

	signIn = async (dto: SignInDto): Promise<BaseResponse<AuthTokens>> =>
		http.post(this.buildUrl(SIGN_IN), dto)

	signOut = async (configs?: AxiosRequestConfig): Promise<void> =>
		http.post(this.buildUrl(SIGN_OUT), undefined, configs)

	getProfile = async (): Promise<BaseResponse<User>> =>
		http.get(this.buildUrl(ME))

	updateProfile = async (dto: UpdateProfileDto): Promise<BaseResponse<void>> =>
		http.put(this.buildUrl(UPDATE_PROFILE), dto)

	changePassword = async (
		dto: ChangePasswordDto,
	): Promise<BaseResponse<void>> =>
		http.post(this.buildUrl(CHANGE_PASSWORD), dto)
}

export default new AuthApi(BASE)

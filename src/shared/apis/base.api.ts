import { AxiosRequestConfig } from 'axios'
import { BaseDTO, BaseResponse, PaginatedResult } from '../common/interfaces'

const httpConfig = await import('@/shared/configs/http.config')

export default class BaseApi<T extends BaseDTO> {
	constructor(public path: string) {}

	protected buildUrl(endpoint?: string): string {
		return this.path + endpoint
	}

	create = async (
		dto: Omit<T, 'id'>,
		configs?: AxiosRequestConfig<T>,
	): Promise<BaseResponse<T>> =>
		httpConfig.default.post(this.buildUrl(), dto, configs)

	fetch = async (
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<PaginatedResult<T>[]>> =>
		httpConfig.default.get(this.buildUrl(), configs)

	fetchOne = async (
		id: string,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> =>
		httpConfig.default.get(this.buildUrl(`/${id}`), configs)

	update = async (
		id: string | number,
		dto: Omit<Partial<T>, 'id'>,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> =>
		httpConfig.default.put(this.buildUrl(`/${id}`), dto, configs)

	delete = async (
		id: string | number,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> =>
		httpConfig.default.delete(this.buildUrl(`/${id}`), configs)
}

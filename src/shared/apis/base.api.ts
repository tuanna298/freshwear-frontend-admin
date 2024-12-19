import http from '@/shared/configs/http.config'
import { AxiosRequestConfig } from 'axios'
import { BaseDTO, BaseResponse, PaginatedResult } from '../common/interfaces'

export default class BaseApi<T extends BaseDTO> {
	constructor(public path: string) {}

	protected buildUrl(endpoint?: string): string {
		return this.path + endpoint
	}

	create = async (
		dto: Omit<T, 'id'>,
		configs?: AxiosRequestConfig<T>,
	): Promise<BaseResponse<T>> => http.post(this.buildUrl(), dto, configs)

	fetch = async (
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<PaginatedResult<T>[]>> =>
		http.get(this.buildUrl(), configs)

	fetchOne = async (
		id: string,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> => http.get(this.buildUrl(`/${id}`), configs)

	update = async (
		id: string | number,
		dto: Omit<Partial<T>, 'id'>,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> => http.put(this.buildUrl(`/${id}`), dto, configs)

	delete = async (
		id: string | number,
		configs?: AxiosRequestConfig<T> | undefined,
	): Promise<BaseResponse<T>> => http.delete(this.buildUrl(`/${id}`), configs)
}

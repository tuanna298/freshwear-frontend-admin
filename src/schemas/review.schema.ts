import { BaseDTO } from '@/shared/common/interfaces'
import { User } from './auth/user.schema'
import { ProductDetail } from './product.schema'

export enum ReviewStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
}

export interface Review extends BaseDTO {
	user: User
	product_detail: ProductDetail
	comment: string
	rating: number
	image: string
	status: ReviewStatus
}

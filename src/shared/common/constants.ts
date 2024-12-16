import { TablePaginationConfig } from 'antd'

export const NODE_ENV = import.meta.env.NODE_ENV
export const API_URL = import.meta.env.VITE_BASE_API_URL
export const APP_NAME = import.meta.env.VITE_APP_NAME

export const API_PATHS = {
	AUTH: {
		BASE: '/auth',
		SIGN_IN: '/sign-in',
		REFRESH: '/refresh',
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
	COLOR: {
		BASE: '/color',
	},
	BRAND: {
		BASE: '/brand',
	},
	MATERIAL: {
		BASE: '/material',
	},
	SIZE: {
		BASE: '/size',
	},
	PRODUCT: {
		BASE: '/product',
	},
	REVIEW: {
		BASE: '/review',
	},
	ORDER: {
		BASE: '/order',
	},
	PAYMENT: {
		BASE: '/payment',
	},
}

export const ROUTE_PATHS = {
	ROOT: '/',
	SIGN_IN: '/sign-in',
	USER: '/user',
	COLOR: '/color',
	BRAND: '/brand',
	MATERIAL: '/material',
	SIZE: '/size',
	PRODUCT: '/product',
	REVIEW: '/review',
	ORDER: '/order',
	PAYMENT: '/payment',
}

export const RESOURCE_MAP: Record<string, string> = {
	'': 'Trang chủ',
	'sign-in': 'Đăng nhập',
	user: 'Người dùng',
	color: 'Màu sắc',
	brand: 'Thương hiệu',
	material: 'Chất liệu',
	size: 'Kích thước',
	product: 'Sản phẩm',
	review: 'Đánh giá',
	order: 'Đơn hàng',
	payment: 'Thanh toán',
	undefined: 'Dữ liệu',
}

export const ACTION_MAP: Record<string, string> = {
	create: 'Thêm mới',
	edit: 'Chỉnh sửa',
	update: 'Cập nhật',
	delete: 'Xóa',
	undefined: 'Thao tác',
}

export const baseTablePaginationConfig: TablePaginationConfig = {
	pageSizeOptions: [5, 10, 20, 50, 100],
	showQuickJumper: true,
	showSizeChanger: true,
	showTotal(total: number, range: [number, number]): React.ReactNode {
		return `${range[0]}-${range[1]} trong tổng số ${total} mục`
	},
}

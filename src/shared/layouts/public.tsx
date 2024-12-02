import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import { ROUTE_PATHS } from '@/shared/common/constants'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const { ROOT, SIGN_IN } = ROUTE_PATHS

const PublicLayout = () => {
	const { accessToken } = useAuthStore()
	const { pathname } = useLocation()

	if (accessToken && pathname.includes(SIGN_IN)) {
		return <Navigate to={ROOT} />
	}

	return <Outlet />
}

export default PublicLayout

import NotificationFloat from '@/components/custom/notification-float'
import { AUTH_KEYS } from '@/modules/auth/common/constants'
import { useAuthStore } from '@/modules/auth/stores/use-auth-store'
import { User } from '@/schemas/auth/user.schema'
import { ROUTE_PATHS } from '@/shared/common/constants'
import { useGetIdentity } from '@refinedev/core'
import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const { SIGN_IN } = ROUTE_PATHS
const { AUTH, PROFILE } = AUTH_KEYS

const ProtectedLayout = () => {
	const { accessToken, refreshToken, setProfile } = useAuthStore()
	const { data } = useGetIdentity<User>({
		queryOptions: {
			queryKey: [AUTH, PROFILE, accessToken, refreshToken],
		},
	})

	useEffect(() => {
		if (data) {
			setProfile(data)
		}
	}, [data])

	if (!accessToken || !refreshToken) {
		return <Navigate to={SIGN_IN} />
	}

	return (
		<>
			<NotificationFloat />
			<Outlet />
		</>
	)
}

export default ProtectedLayout

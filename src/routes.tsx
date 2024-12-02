import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalSpinner from './components/custom/global-spinner'
import { AuthLayout, SignIn } from './modules/auth'
import { ROUTE_PATHS } from './shared/common/constants'
import { AppLayout, ProtectedLayout, PublicLayout } from './shared/layouts'

const { ROOT, SIGN_IN, USER } = ROUTE_PATHS

export default () => (
	<Routes>
		{/* App */}
		<Route
			path={ROOT}
			element={
				<Suspense fallback={<GlobalSpinner />}>
					<ProtectedLayout />
				</Suspense>
			}
		>
			<Route
				path={ROOT}
				element={
					<Suspense fallback={<GlobalSpinner />}>
						<AppLayout />
					</Suspense>
				}
			>
				<Route
					index
					element={
						<Suspense fallback={<GlobalSpinner />}>
							{/* <Overview /> */}
						</Suspense>
					}
				/>
				<Route
					path={USER}
					element={<Suspense>{/* <Transaction /> */}</Suspense>}
				/>
			</Route>
		</Route>
		{/* Auth */}
		<Route
			path={ROOT}
			element={
				<Suspense fallback={<GlobalSpinner />}>
					<PublicLayout />
				</Suspense>
			}
		>
			<Route element={<AuthLayout />}>
				<Route
					path={SIGN_IN}
					element={
						<Suspense>
							<SignIn />
						</Suspense>
					}
				/>
			</Route>
		</Route>
	</Routes>
)

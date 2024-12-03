import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalSpinner from './components/custom/global-spinner'
import AttributeManagement from './modules/attribute/pages/attribute-management'
import { AuthLayout, SignIn } from './modules/auth'
import { ColorManagement } from './modules/color'
import { ROUTE_PATHS } from './shared/common/constants'
import { AppLayout, ProtectedLayout, PublicLayout } from './shared/layouts'

const {
	ROOT,
	SIGN_IN,
	USER,
	COLOR,
	BRAND,
	MATERIAL,
	SIZE,
	PRODUCT,
	REVIEW,
	ORDER,
	PAYMENT,
} = ROUTE_PATHS

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
				<Route
					path={COLOR}
					element={
						<Suspense>
							<ColorManagement />
						</Suspense>
					}
				/>
				<Route
					path={BRAND}
					element={
						<Suspense>
							<AttributeManagement />
						</Suspense>
					}
				/>
				<Route
					path={MATERIAL}
					element={
						<Suspense>
							<AttributeManagement />
						</Suspense>
					}
				/>
				<Route
					path={SIZE}
					element={
						<Suspense>
							<AttributeManagement />
						</Suspense>
					}
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

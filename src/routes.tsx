import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import GlobalSpinner from './components/custom/global-spinner'
import { AttributeManagement } from './modules/attribute'
import { AuthLayout, SignIn } from './modules/auth'
import { ColorManagement } from './modules/color'
import { Dashboard } from './modules/dashboard'
import { DashboardContextProvider } from './modules/dashboard/context'
import { OrderManagement, OrderUpdate } from './modules/order'
import { PaymentManagement } from './modules/payment'
import {
	ProductCreate,
	ProductManagement,
	ProductUpdate,
} from './modules/product'
import { ReviewManagement } from './modules/review'
import { UserManagement, UserShow } from './modules/user'
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
							<DashboardContextProvider>
								<Dashboard />
							</DashboardContextProvider>
						</Suspense>
					}
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
				<Route
					path={PRODUCT}
					element={
						<Suspense>
							<ProductManagement />
						</Suspense>
					}
				/>
				<Route
					path={PRODUCT + '/create'}
					element={
						<Suspense>
							<ProductCreate />
						</Suspense>
					}
				/>
				<Route
					path={PRODUCT + '/edit/:id?'}
					element={
						<Suspense>
							<ProductUpdate />
						</Suspense>
					}
				/>

				<Route
					path={ORDER}
					element={
						<Suspense>
							<OrderManagement />
						</Suspense>
					}
				/>
				<Route
					path={ORDER + '/edit/:id?'}
					element={
						<Suspense>
							<OrderUpdate />
						</Suspense>
					}
				/>

				<Route
					path={USER}
					element={
						<Suspense>
							<UserManagement />
						</Suspense>
					}
				/>
				<Route
					path={USER + '/show/:id?'}
					element={
						<Suspense>
							<UserShow />
						</Suspense>
					}
				/>
				<Route
					path={PAYMENT}
					element={
						<Suspense>
							<PaymentManagement />
						</Suspense>
					}
				/>
				<Route
					path={REVIEW}
					element={
						<Suspense>
							<ReviewManagement />
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

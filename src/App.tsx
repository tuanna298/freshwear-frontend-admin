import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerBindings, {
	DocumentTitleHandler,
	UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { QueryClient } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import vi_VN from 'antd/locale/vi_VN'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import TooltipProvider from './components/ui/tooltip'
import authProvider from './refine/auth-provider'
import dataProvider from './refine/data-provider'
import notificationProvider from './refine/notification-provider'
import resources from './resources'
import AppRoutes from './routes'
import queryConfig from './shared/configs/query.config'

const queryClient = new QueryClient(queryConfig)

function App() {
	return (
		<BrowserRouter
			future={{
				v7_startTransition: true,
				v7_relativeSplatPath: true,
			}}
		>
			<RefineKbarProvider>
				<TooltipProvider delayDuration={80}>
					<ConfigProvider
						locale={vi_VN}
						theme={{
							token: {
								colorPrimary: '#c1c9cf',
								fontFamily:
									'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
							},
							components: {
								Steps: {
									iconSize: 48,
									customIconSize: 48,
									customIconFontSize: 30,
									titleLineHeight: 32,
									iconFontSize: 30,
									descriptionMaxWidth: 180,
									fontSize: 16,
									fontSizeLG: 20,
									colorPrimary: 'hsl(var(--primary))',
								},
							},
						}}
					>
						<Refine
							dataProvider={dataProvider}
							resources={resources}
							routerProvider={routerBindings}
							authProvider={authProvider}
							notificationProvider={notificationProvider}
							options={{
								syncWithLocation: false,
								warnWhenUnsavedChanges: true,
								useNewQueryKeys: true,
								projectId: 'd0NzSK-Da1qaB-k1nokQ',
								reactQuery: {
									clientConfig: queryClient,
								},
							}}
						>
							<AppRoutes />
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
							<Toaster />
						</Refine>
					</ConfigProvider>
				</TooltipProvider>
			</RefineKbarProvider>
		</BrowserRouter>
	)
}

export default App

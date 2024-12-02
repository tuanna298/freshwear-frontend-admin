import { Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerBindings, {
	DocumentTitleHandler,
	UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import authProvider from './refine/auth-provider'
import dataProvider from './refine/data-provider'
import notificationProvider from './refine/notification-provider'
import resources from './resources'
import AppRoutes from './routes'
import queryConfig from './shared/configs/query.config'

const queryClient = new QueryClient(queryConfig)

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<Refine
					dataProvider={dataProvider}
					resources={resources}
					routerProvider={routerBindings}
					authProvider={authProvider}
					notificationProvider={notificationProvider}
					options={{
						syncWithLocation: true,
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
			</RefineKbarProvider>
		</BrowserRouter>
	)
}

export default App

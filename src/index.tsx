import dayjs from 'dayjs'
import LocaleData from 'dayjs/plugin/localeData'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import WeekDay from 'dayjs/plugin/weekday'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App'

dayjs.extend(relativeTime)
dayjs.extend(WeekDay)
dayjs.extend(LocaleData)
dayjs.extend(LocalizedFormat)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)

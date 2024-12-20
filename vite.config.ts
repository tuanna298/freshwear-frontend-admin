import react from '@vitejs/plugin-react'
import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.join(__dirname, 'src'),
		},
	},
	esbuild: {
		target: 'esnext',
	},
})

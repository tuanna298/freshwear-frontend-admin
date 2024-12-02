/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			xxs: '320px',
			xs: '420px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1601px',
			'3xl': '1900px',
		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
				},
				processing: {
					DEFAULT: 'hsl(var(--processing))',
					foreground: 'hsl(var(--processing-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					1: 'hsl(var(--chart-1))',
					2: 'hsl(var(--chart-2))',
					3: 'hsl(var(--chart-3))',
					4: 'hsl(var(--chart-4))',
					5: 'hsl(var(--chart-5))',
				},
				'primary-muted': 'hsl(var(--primary-muted))',
				'primary-light': 'hsl(var(--primary-light))',
				'color-1': 'hsl(var(--color-1))',
				'color-2': 'hsl(var(--color-2))',
				'color-3': 'hsl(var(--color-3))',
				'color-4': 'hsl(var(--color-4))',
				'color-5': 'hsl(var(--color-5))',
			},
			aspectRatio: {
				'rectangle-horizontal': '4 / 3',
				'rectangle-vertical': '3 / 4',
			},
		},
		keyframes: {
			typing: {
				'0%': {
					width: '0%',
					visibility: 'hidden',
				},
				'100%': {
					width: '100%',
				},
			},
			blink: {
				'0%, 100%': {
					borderColor: 'transparent',
				},
				'50%': {
					borderColor: 'hsl(var(--primary))',
				},
			},
			'caret-blink': {
				'0%,70%,100%': { opacity: '1' },
				'20%,50%': { opacity: '0' },
			},
			bounce: {
				'0%, 100%': { transform: 'translateY(0)', easing: 'ease-in-out' },
				'50%': { transform: 'translateY(-10px)', easing: 'ease-in-out' },
			},
			fadeIn: {
				from: { opacity: '0' },
				to: { opacity: '1' },
			},
			shine: {
				from: { backgroundPosition: '200% 0' },
				to: { backgroundPosition: '-200% 0' },
			},
			slideDown: {
				'0%': { transform: 'translateY(-100%)' },
				'50%': { transform: 'translateY(0)' },
				'100%': { transform: 'translateY(100%)' },
			},
			rainbow: {
				'0%': { 'background-position': '0%' },
				'100%': { 'background-position': '200%' },
			},
			shimmer: {
				'0%, 90%, 100%': {
					'background-position': 'calc(-100% - var(--shimmer-width)) 0',
				},
				'30%, 60%': {
					'background-position': 'calc(100% + var(--shimmer-width)) 0',
				},
			},
		},
		animation: {
			typing: 'typing 2s steps(20) forwards, blink 1.3s infinite 1s',
			'caret-blink': 'caret-blink 1.2s ease-out infinite',
			bounce: 'bounce 3s infinite',
			spin: 'spin 1s linear infinite',
			ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
			pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			fade: 'fadeIn .5s ease-in-out',
			shine: 'shine 8s ease-in-out infinite',
			slide: 'slideDown 2s infinite',
			rainbow: 'rainbow var(--speed, 2s) infinite linear',
			shimmer: 'shimmer 8s infinite',
		},
	},
	plugins: [require('tailwindcss-animate')],
}
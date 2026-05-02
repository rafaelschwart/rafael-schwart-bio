import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1180px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'display': ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
				'mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			letterSpacing: {
				'microtight': '-0.04em',
				'tightest': '-0.025em',
				'tight-display': '-0.022em',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				/* Warm-earthy section surfaces — exact hex from the design package */
				cream: '#f7f4ed',
				charcoal: '#1d1c19',
				offwhite: '#fcfbf8',
				'border-soft': '#e4dfd4',
				'border-medium': '#d4ccbc',
				'surface-cream': '#f7f4ed',
				'surface-peach': '#f4e9dc',
				'surface-sage': '#e8ebe0',
				'surface-ivory': '#fbf8f0',
				'surface-clay': '#efe2d4',
				'surface-slate': '#e6e6e0',
				'surface-dark': '#1f1e1a',
			},
			boxShadow: {
				'soft': 'var(--shadow-soft)',
				'medium': 'var(--shadow-medium)',
				'strong': 'var(--shadow-strong)',
				'inset-btn': 'var(--inset-btn)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
				'lift': 'cubic-bezier(0.2, 0.7, 0.3, 1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in-up': {
					from: { opacity: '0', transform: 'translateY(16px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

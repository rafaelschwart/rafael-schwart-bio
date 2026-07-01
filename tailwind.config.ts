import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
				'sans': ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'display': ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'mono': ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
			},
			letterSpacing: {
				'microtight': '-0.04em',
				'tightest': '-0.025em',
				'tight-display': '-0.022em',
				'label': '0.12em',
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
				/* V2 "engineering ledger" palette — raw hex, source in src/index.css */
				paper: '#f5f3ec',
				'paper-soft': '#faf8f2',
				'paper-2': '#edeae0',
				'paper-3': '#e2dfd5',
				ink: '#0a0a0a',
				'ink-2': '#181818',
				'ink-3': '#353535',
				mute: '#57534b',
				fade: '#8e8e8e',
				signal: '#3664ff',
				'signal-deep': '#2348d4',
				beacon: '#3664ff',
				grow: '#269926',
				/* Legacy aliases so any not-yet-refactored callers still resolve */
				charcoal: '#0a0a0a',
				'surface-cream': '#f5f3ec',
				'surface-dark': '#0a0a0a',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
				'lift': 'cubic-bezier(0.2, 0.7, 0.3, 1)',
				'eng': 'cubic-bezier(0.42, 0, 0.58, 1)',
				'settle': 'cubic-bezier(0.2, 0, 0, 1)',
			},
			maxWidth: {
				'ledger': '1320px',
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
				},
				'rs-fade': {
					from: { opacity: '0', transform: 'translateY(8px)' },
					to: { opacity: '1', transform: 'none' }
				},
				'rs-pulse': {
					'0%': { boxShadow: '0 0 0 0 rgba(54,100,255,0.45)' },
					'70%': { boxShadow: '0 0 0 14px rgba(54,100,255,0)' },
					'100%': { boxShadow: '0 0 0 0 rgba(54,100,255,0)' }
				},
				'rs-ramp': {
					'0%,100%': { boxShadow: '0 0 0 0 rgba(54,100,255,0.5)' },
					'50%': { boxShadow: '0 0 0 6px rgba(54,100,255,0)' }
				},
				'rs-spin': { to: { transform: 'rotate(360deg)' } },
				'rs-caret': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'rs-fade': 'rs-fade 0.38s cubic-bezier(0.42,0,0.58,1)',
				'rs-pulse': 'rs-pulse 3.2s ease-out infinite',
				'rs-ramp': 'rs-ramp 2.4s ease-in-out infinite',
				'rs-spin': 'rs-spin 5s linear infinite',
				'rs-caret': 'rs-caret 1.1s step-end infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;

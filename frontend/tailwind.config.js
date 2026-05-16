/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: {
          950: '#020408',
          900: '#050b14',
          800: '#080f1c',
          700: '#0c1525',
        },
        nebula: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        aurora: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        plasma: {
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
        },
        glow: {
          purple: 'rgba(139, 92, 246, 0.15)',
          blue: 'rgba(14, 165, 233, 0.15)',
          pink: 'rgba(236, 72, 153, 0.1)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-1': 'radial-gradient(at 40% 20%, hsla(265,80%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(200,90%,50%,0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(290,70%,40%,0.1) 0px, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'border-beam': 'borderBeam 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        borderBeam: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-md': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 80px rgba(139, 92, 246, 0.25)',
        'glow-blue': '0 0 40px rgba(14, 165, 233, 0.25)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        'inner-glow': 'inset 0 0 30px rgba(139, 92, 246, 0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.07)',
        'glass-hover': 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
  plugins: [],
}

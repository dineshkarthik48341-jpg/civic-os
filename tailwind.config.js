/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: {
          DEFAULT: '#121216',
          subtle: '#18181b',
          elevated: '#202025',
          border: '#27272a'
        },
        civic: {
          cyan: '#06b6d4',
          amber: '#f59e0b',
          crimson: '#ef4444',
          emerald: '#10b981',
          purple: '#a855f7',
          blue: '#3b82f6'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glowCyan: {
          'from': { boxShadow: '0 0 8px rgba(6, 182, 212, 0.3)' },
          'to': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.7)' },
        }
      }
    },
  },
  plugins: [],
};

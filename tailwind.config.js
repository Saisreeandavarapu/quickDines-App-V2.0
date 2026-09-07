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
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#162F7A',
          800: '#102A72',
          900: '#0B1F5E',
          950: '#071535',
        },
        navy: {
          deep: '#0B1F5E',
          mid: '#102A72',
          light: '#162F7A',
          dark: '#071535',
          card: '#0A1738',
          subtle: '#0F172A'
        },
        accent: {
          blue: '#2563EB',
          light: '#3B82F6',
          sky: '#60A5FA',
        },
        surface: {
          light: '#F7F9FC',
          card: '#FFFFFF',
          muted: '#F1F5F9',
          border: '#E2E8F0',
        },
        text: {
          main: '#0F172A',
          muted: '#334155',
          subtle: '#64748B',
        },
        status: {
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#DC2626',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '18px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(11, 31, 94, 0.05)',
        'card': '0 10px 30px -5px rgba(11, 31, 94, 0.08)',
        'floating': '0 20px 40px -10px rgba(7, 21, 53, 0.18)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.35)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #0B1F5E 0%, #162F7A 50%, #2563EB 100%)',
        'dark-gradient': 'linear-gradient(180deg, #071535 0%, #0A1738 100%)',
        'hero-pattern': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1E40AF',
        'indigo-500': '#6366F1',
        'indigo-600': '#4F46E5',
        'light-gray': '#F0F0F0',
        'muted-gray': '#7A7A7A',
        'error-red': '#EF4444',
        'accent-yellow': '#FBBF24',
        'zinc-300': '#D4D4D8',
        'zinc-500': '#71717A',
        'zinc-800': '#27272A',
        'zinc-900': '#18181B',
        'rose-400': '#FB7185',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'Red_Hat_Display': ['Red Hat Display', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2' }],
        'h2': ['24px', { lineHeight: '1.3' }],
        'body': ['14px', { lineHeight: '1.5' }],
        'label': ['14px', { lineHeight: '1.4' }],
        '4xl': ['36px', { lineHeight: '53px' }],
        '3xl': ['30px', { lineHeight: '1.2' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'btn': '8px',
        'input': '8px',
        'tl': '8px 0 0 0',
        'tr': '0 8px 0 0',
      },
      height: {
        '14': '3.5rem',
        '12': '3rem',
      },
    },
  },
  plugins: [],
}
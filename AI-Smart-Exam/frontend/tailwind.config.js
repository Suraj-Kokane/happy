/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        card: 'rgba(23, 31, 48, 0.7)',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#10b981',
        textPrimary: '#f1f5f9',
        textSecondary: '#94a3b8',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

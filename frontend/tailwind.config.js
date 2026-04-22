/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors:{
        primary: '#22c55e',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        borderSubtle: '#e2e8f0',
        bgDoctor: '#f1f5f9',
'primary': '#22c55e'
      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fill,minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { 50:"#f7f7f8", 100:"#eeeef0", 200:"#dcdcde", 300:"#c9c9cc", 400:"#9b9ba1", 500:"#6f6f76", 600:"#4b4b52", 700:"#2e2e35", 800:"#1e1e24", 900:"#141419" },
        brand: { 50:"#eef2ff", 100:"#e0e7ff", 200:"#c7d2fe", 300:"#a5b4fc", 400:"#818cf8", 500:"#6366f1", 600:"#4f46e5", 700:"#4338ca", 800:"#3730a3", 900:"#312e81" },
        mint: { 100:"#d1fae5", 300:"#6ee7b7", 500:"#10b981" }
      },
      boxShadow: {
        soft: "0 2px 20px rgba(0,0,0,0.06)",
        ring: "0 0 0 1px rgba(99,102,241,0.15), 0 8px 30px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: [],
}

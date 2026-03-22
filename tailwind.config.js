/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT:'#6366F1', dark:'#4F46E5', light:'#818CF8' },
        accent:   { DEFAULT:'#F59E0B', dark:'#D97706', light:'#FCD34D' },
        success:  '#10B981',
        danger:   '#EF4444',
        neutral:  {
          50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
          300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
          600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk','system-ui','sans-serif'],
        body:    ['Inter','system-ui','sans-serif'],
      },
      boxShadow: {
        card:    '0 2px 8px rgba(99,102,241,0.08),0 1px 2px rgba(0,0,0,0.06)',
        primary: '0 8px 20px rgba(99,102,241,0.25)',
        accent:  '0 8px 20px rgba(245,158,11,0.3)',
      },
      borderRadius: {
        xs:'4px', sm:'8px', md:'12px', lg:'16px', xl:'24px', '2xl':'32px',
      },
    },
  },
  plugins: [],
};

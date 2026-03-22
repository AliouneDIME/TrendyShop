/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0f',
        void: '#111118',
        carbon: '#1a1a24',
        steel: '#2a2a38',
        mist: '#3d3d52',
        ash: '#6b6b85',
        silver: '#a0a0b8',
        pearl: '#d4d4e8',
        ivory: '#f0f0f8',
        gold: {
          DEFAULT: '#c9a85c',
          light: '#e8c97a',
          dark: '#8b6e35',
        },
        electric: '#4f6ef7',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease infinite',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #c9a85c 0%, #e8c97a 50%, #c9a85c 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 60% 50%, rgba(79,110,247,0.15) 0%, transparent 60%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

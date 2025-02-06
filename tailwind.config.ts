import TailwindAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './index.html', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#7d1f70',
        'primary-dark': '#090325',
        secondary: '#fba819',
        background: '#f9f7f1',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        billboard: 'min(42.8571vw, 55vh)',
      },
    },
  },
  plugins: [TailwindAnimate],
};

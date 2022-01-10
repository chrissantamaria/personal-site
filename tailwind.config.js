module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
      },
      animation: {
        float: 'float 2s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    fontFamily: {
      sans: ['Open Sans', 'Arial', 'Helvetica', 'sans-serif'],
    },
  },
  variants: {
    animation: ['responsive', 'motion-safe'],
  },
};

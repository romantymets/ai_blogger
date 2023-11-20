import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      gallery: '#EFEFEFCC',
      royalBlue: '#3652E1',
      natural200: '#E5E5E5',
      trout: '#495057',
      paleSky: '#6C757D',
      athensGray: '#F8F9FA',
      silver: '#C4C4C4',
      recentBg: 'rgba(229, 229, 229, 0.30)',
      azureRadiance: '#0089FF',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    '@tailwindcss/forms',
    function ({ addVariant }) {
      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')
    },
  ],
}

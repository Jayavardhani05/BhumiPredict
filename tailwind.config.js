/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#123B5D',
          blue: '#1D5D8F',
          lightblue: '#EAF3F8',
          page: '#F5F7F9',
          card: '#FFFFFF',
          border: '#D9E1E7',
          text: '#1F2937',
          subtext: '#64748B',
          success: '#198754',
          warning: '#D99A00',
          danger: '#C0392B',
        },
      },
    },
  },
  plugins: [],
};

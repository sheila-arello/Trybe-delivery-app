/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {

    extend: {
      colors: {
        'd-orange': '#E27E22',
      },

    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui')],
};

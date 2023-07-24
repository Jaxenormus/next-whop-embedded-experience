const preset = require('@whop/frosted-ui/preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    preset({
      content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/layouts/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {

      }
    }),
  ],
  theme: {
    container: {
      center: true,
    }
  },
  plugins: [require("tailwindcss-animate")],
}
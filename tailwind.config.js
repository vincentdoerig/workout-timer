/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    darkSelector: '.dark-mode',
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-focus', 'hover', 'focus'],
    borderColor: ['dark'],
    textColor: ['dark', 'dark-hover'],
  },
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-dark-mode')(),
  ],
};

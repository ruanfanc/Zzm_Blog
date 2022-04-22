module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    flex: {
      '1': '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      inherit: 'inherit',
      none: 'none',
      '2': '2 2 0%',
      '3': '3 3 0%',
      '4': '4 4 0%',
      '5': '5 5 0%',
      '6': '6 6 0%',
      '7': '7 7 0%',
      '8': '8 8 0%',
      '9': '9 9 0%',
      '10': '10 10 0%',
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

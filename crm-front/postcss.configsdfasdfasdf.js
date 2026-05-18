export default {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions"
      ]
    },
    'postcss-px2rem': {
      unitToConvert: 'px',
      viewportWidth: 1920,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/node_modules/, /styles/],
    }
  }
}

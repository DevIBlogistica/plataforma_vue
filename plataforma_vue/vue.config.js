module.exports = {
  // Options for the Vue CLI
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  devServer: {
    proxy: 'http://localhost:3000'
  },
  lintOnSave: false,
  productionSourceMap: false
}
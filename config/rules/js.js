export default {
  exclude: /node_modules/,
  test: /\.(js|jsx)$/i,
  use: [{
    loader: 'babel-loader'
  }, {
    loader: 'source-map-loader'
  }]
}
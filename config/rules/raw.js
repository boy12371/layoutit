export default {
  exclude: /node_modules/,
  test: /\.(pem|txt)$/,
  use: [{
    loader: 'raw-loader'
  }]
}

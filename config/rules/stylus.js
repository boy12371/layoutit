import IS_DEV from 'isdev'

export default {
  exclude: /\.module\.styl$/,
  test: /\.styl$/,
  use: [{
    loader: 'style-loader',
    options: { sourceMap: IS_DEV }
  }, {
    loader: 'css-loader',
    options: { sourceMap: IS_DEV }
  }, {
    loader: 'postcss-loader',
    options: { sourceMap: IS_DEV }
  }, {
    loader: 'stylus-loader',
    options: {
      preferPathResolver: 'webpack',
      sourceMap: IS_DEV
    }
  }]
}
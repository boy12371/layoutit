import IS_DEV from 'isdev'

export default {
  exclude: /\.module\.less$/,
  test: /\.less$/,
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
    loader: 'less-loader',
    options: { sourceMap: IS_DEV }
  }]
}
import IS_DEV from 'isdev'

export default {
  test: /\.module\.less$/,
  use: [{
    loader: 'style-loader',
    options: { sourceMap: IS_DEV }
  }, {
    loader: 'css-loader',
    options: {
      localIdentName: '[sha512:hash:base32]-[name]-[local]',
      modules: true,
      sourceMap: IS_DEV
    }
  }, {
    loader: 'postcss-loader',
    options: { sourceMap: IS_DEV }
  }, {
    loader: 'less-loader',
    options: {
      preferPathResolver: 'webpack',
      sourceMap: IS_DEV
    }
  }]
}
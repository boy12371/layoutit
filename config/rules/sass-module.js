import IS_DEV from 'isdev'

export default modulePaths => ({
  test: /\.module\.s[ac]ss$/,
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
    loader: 'sass-loader',
    options: {
      includePaths: modulePaths,
      sourceMap: IS_DEV
    }
  }]
})
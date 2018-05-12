const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const UglifyJs = new UglifyJsPlugin({
  sourceMap: true,
  parallel: 4,
  uglifyOptions: { compress: true }
});

module.exports = UglifyJs;

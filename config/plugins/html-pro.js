const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

const Html = new HtmlWebpackPlugin({
  title: "HOME",
  chunks: ["index"],
  filename: "index.html",
  template: path.resolve(__dirname, "../../src/assets/ejs/index.ejs"),
  inject: "body",
  minify: {
    removeAttributeQuotes: true,
    collapseWhitespace: true,
    html5: true,
    minifyCSS: true,
    removeComments: true,
    removeEmptyAttributes: true
  },
  hash: true
});

module.exports = Html;

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Html = new HtmlWebpackPlugin({
  title: "HOME",
  chunks: ["index"],
  filename: "index.html",
  template: path.resolve(__dirname, "../../src/assets/ejs/index.ejs"),
  inject: "body",
  hash: true
});

module.exports = Html;

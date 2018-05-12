const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const Clean = new CleanWebpackPlugin(["dist"], {
  root: path.resolve(__dirname, "../.."),
  verbose: true
});

module.exports = Clean;

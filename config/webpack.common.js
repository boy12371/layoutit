const path = require("path");
const ImgRule = require("./rules/img");
const EjsRule = require("./rules/ejs");
const CleanPlugin = require("./plugins/clean-com");
const CSSPlugin = require("./plugins/css-com");

const config = {
  entry: {
    index: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    filename: "assets/js/[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  module: {
    rules: [ImgRule, EjsRule]
  },
  plugins: [CleanPlugin, CSSPlugin]
};

module.exports = config;

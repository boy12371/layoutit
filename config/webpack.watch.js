const Common = require("./webpack.common");
const SassRule = require("./rules/sass-dev");
const CssRule = require("./rules/css-dev");
const HtmlPlugin = require("./plugins/html-dev");

const Watch = {
  mode: "development",
  watch: true,
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

const config = Object.assign(Common, Watch);

config.module.rules.push(CssRule, SassRule);
config.plugins.push(HtmlPlugin);

module.exports = config;

const Common = require("./webpack.common");
const SassRule = require("./rules/sass-dev");
const CssRule = require("./rules/css-pro");
const HtmlPlugin = require("./plugins/html-pro");
const UglifyjsPlugin = require("./plugins/uglifyjs");

const Pro = {
  mode: "production"
};

const config = Object.assign(Common, Pro);

config.module.rules.push(CssRule, SassRule);
config.plugins.push(HtmlPlugin, UglifyjsPlugin);

module.exports = config;

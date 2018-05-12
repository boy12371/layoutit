const Common = require("./webpack.common");
const SassRule = require("./rules/sass-dev");
const CssRule = require("./rules/css-dev");
const HtmlPlugin = require("./plugins/html-dev");

const Dev = {
  mode: "development"
};

const config = Object.assign(Common, Dev);

config.module.rules.push(CssRule, SassRule);
config.plugins.push(HtmlPlugin);

// console.log(config);
module.exports = config;

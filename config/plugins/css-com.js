const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ExtractCSS = new ExtractTextPlugin("assets/css/[name].css");

module.exports = ExtractCSS;

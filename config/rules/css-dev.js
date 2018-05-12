const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: { loader: "style-loader", options: { sourceMap: true } },
    publicPath: "../../",
    use: [
      {
        loader: "css-loader",
        options: { sourceMap: true }
      },
      {
        loader: "postcss-loader",
        options: { sourceMap: true }
      }
    ]
  })
};

module.exports = Css;

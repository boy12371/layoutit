const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Sass = {
  test: /\.(s[ac]ss)$/,
  use: ExtractTextPlugin.extract({
    fallback: { loader: "style-loader", options: { sourceMap: true } },
    use: [
      {
        loader: "css-loader",
        options: { sourceMap: true }
      },
      {
        loader: "postcss-loader",
        options: { sourceMap: true }
      },
      {
        loader: "sass-loader"
      }
    ]
  })
};

module.exports = Sass;

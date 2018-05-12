const ExtractTextPlugin = require("extract-text-webpack-plugin");

const Css = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: { loader: "style-loader" },
    publicPath: "/assets/css/",
    use: [
      {
        loader: "css-loader",
        options: { minimize: true }
      },
      {
        loader: "postcss-loader"
      }
    ]
  })
};

module.exports = Css;

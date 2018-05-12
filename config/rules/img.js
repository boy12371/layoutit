const Img = {
  test: /\.(gif|png|jpe?g|svg)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 8192,
        name: "assets/img/[name].[ext]?[hash:8]"
      }
    }
  ]
};

module.exports = Img;

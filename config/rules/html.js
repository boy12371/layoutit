const Html = {
  test: /\.html$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].html"
      }
    },
    {
      loader: "extract-loader"
    },
    {
      loader: "html-loader",
      options: {
        attrs: ["img:src", "link:href"]
      }
    }
  ]
};

module.exports = Html;

import util from "util";
import webpackConfig from "./webpack.babel.js";
import fs from "fs";

fs.writeFileSync(
  "./webpack.config.js",
  "module.exports = " + util.inspect(webpackConfig, false, 9, false),
  "utf-8"
);

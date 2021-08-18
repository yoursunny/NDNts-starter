const path = require("path");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    disableHostCheck: true,
    port: 3333,
  },
};

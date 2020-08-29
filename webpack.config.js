// eslint-disable-next-line import/no-extraneous-dependencies
const path = require("path");

/** @return {import("webpack").Configuration} */
module.exports = {
  entry: "./src/main.js",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    disableHostCheck: true,
    port: 3333,
  },
};

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
  performance: {
    hints: false,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    allowedHosts: "all",
    port: 3333,
  },
};

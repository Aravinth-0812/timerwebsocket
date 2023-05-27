var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
  },
  target: "node",
  mode: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
      },
    ],
  },
};

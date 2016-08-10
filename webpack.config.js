var webpack = require('webpack'),
    path    = require('path');

module.exports = {
  entry: {
    reports : "./game",
  },
  output: {
    path     : path.join(__dirname, "/build"),
    filename : "[name].js",
    chunkFilename: "[id].chunk.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
    ]
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     mangle: true
  //   })
  // ]
};

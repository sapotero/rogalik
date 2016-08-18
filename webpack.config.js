var webpack = require('webpack'),
    path    = require('path');

module.exports = {
  entry: {
    game : "./game",
  },
  output: {
    path     : path.join(__dirname, "/build"),
    filename : "[name].js",
    chunkFilename : "[id].chunk.js",
    libraryTarget : "var",
    library       : "Core"
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

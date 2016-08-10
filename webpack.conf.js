var webpack = require('webpack'),
    path    = require('path');

module.exports = {
  entry: {
    reports : "./public/assets/js/reports.js",
    prints  : "./public/assets/js/prints.js",
    forms   : "./public/assets/js/forms.js",
    element : "./public/assets/js/element/element.js",
  },
  output: {
    path     : path.join(__dirname, "/public/assets/build"),
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

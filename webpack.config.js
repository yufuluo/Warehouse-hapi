module.exports = {
  entry: "./client/app.jsx",
  output: {
    path: "dist/js",
    filename: "bundle.js",
    publicPath: "http://127.0.0.1:2992/js"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.styl$/,
        loader: "style-loader"
      }
    ]
  }
};

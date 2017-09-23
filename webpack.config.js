module.exports = {
  entry: './src/components/index.jsx',
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css/, loader: "style!css" }
    ]
  }
}

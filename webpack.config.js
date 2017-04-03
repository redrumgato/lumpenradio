var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = function(env) {
  env = env || { dev: true };
  return {
    context: path.resolve(__dirname),
    entry: "./js/index.js",
    output: {
      filename: "static/js/app.js"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { minimize: env.prod }
              },
              "postcss-loader",
              "sass-loader"
            ]
          })
        }
      ]
    },
    resolve: {
      alias: {
        Styles: path.resolve(__dirname, "stylesheets/")
      }
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "static/css/app.css",
        allChunks: true
      })
    ].concat(!env.prod ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ])
  }
}

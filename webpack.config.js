const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ESLintPlugin = require("eslint-webpack-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",
  devtool: "eval-cheap-source-map",

  entry: {
    app: path.resolve(__dirname, "src", "scripts", "index.js"),
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: "js/[name].js",
  },

  devServer: {
    hot: true,
    port: 3000,
  },

  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
    new StylelintPlugin({
      files: path.join("src", "**/*.s?(a|c)ss"),
    }),
    new ESLintPlugin({
      extensions: "js",
      emitWarning: true,
      files: path.resolve(__dirname, "src"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.s?(a|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
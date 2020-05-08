const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const publicUrl = process.env.PUBLIC_URL || '/';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  context: path.join(__dirname, 'src'),
  entry: {
    src: [
      isDevelopment && 'react-hot-loader/patch',
      './index.jsx',
    ].filter(Boolean),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && 'react-hot-loader/babel'].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        // This line, when changed to "include: /node_modules\/react-dom/," will unbreak the app
        include: /node_modules/,
        use: 'react-hot-loader/webpack',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[name].[chunkhash:8].css',
    }),
  ].filter(Boolean),
  optimization: {
    moduleIds: 'named',
    splitChunks: false,
  },
  stats: {
    assetsSort: '!size',
    entrypoints: false,
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
};

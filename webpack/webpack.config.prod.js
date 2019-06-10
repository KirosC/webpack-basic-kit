const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common,
  {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    bail: true,
    output: {
      filename: 'assets/js/[name].[chunkhash:8].js',
      chunkFilename: 'assets/js/[name].[chunkhash:8].chunk.js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        inject: true,
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'assets/css/[name].[contenthash].css',
        chunkFilename: '[name].[id].css',
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              // translates CSS into CommonJS
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              // compiles Sass to CSS
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true
              }
            }
          ],
        },
        {
          test: /\.html$/,
          use: ['html-loader']
        }
      ]
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    }
  });
/*eslint-disable */
'use strict'

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var NODE_ENV = process.env.NODE_ENV || 'development';
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'karma' || NODE_ENV === 'test';
var isProd = ENV === 'build' || NODE_ENV === 'production';

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
}

function webpackConfig() {

  var config = {}

  config.entry = isTest ? {} : {
      build: [
        //'babel-polyfill',
        path.join(PATHS.src, 'app/app'),
      ],
      vendor: [
        'angular',
        'angular-ui-router'
      ],
    }

  config.output = isTest ? {}: {
      path: PATHS.dist,

      publicPath: isProd ? '/' : 'http://localhost:8081/',

      filename: isProd ? '[name]-[hash:7].js' : '[name].build.js',

      chunkFilename: isProd ? '[name]-[hash:7].js' : '[name].build.js',
    }

  if (isTest) {
    config.devtool = 'inline-source-map'
  } else if (isProd) {
    config.devtool = 'source-map'
  } else {
    config.devtool = 'eval'
  }

  config.module = {
    preLoaders: [],
    postLoaders: [],
    loaders: [{
      test: /\.js$/,
      include: PATHS.src,
      loader: 'babel',
      exclude: '/node_modules/',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?sourceMap!postcss'
      ),
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(eot|ttf|woff|woff2|wav|mp3)$/,
      loader: 'url?name=[path][name]-[hash:7].[ext]',
    }, {
      test: /\.(png|ico|jpe?g|gif|svg)$/i,
      loaders: [
        'file?name=[path][name]-[hash:7].[ext]&limit=8192',
      ],
    }, {
      test: /\.html$/,
      loader: 'html',
    },],
  };

  config.postcss = [
    autoprefixer({
      browsers: ['>1%', 'last 2 versions'],
    }),
  ];

  config.plugins = [
    // Sort module indices by occurrence frequency
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),

      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          unsafe: true,
        },
        sourceMap: false
      })
    )
  }

  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        minify: {
          removeAttributeQuotes: true
        },
        favicon: 'src/favicon.ico'
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash:7].js')
    )
  }

  config.resolve = {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      'src': path.resolve(__dirname, './src'),

      'app': path.resolve(__dirname, './src/app'),
      'assets': path.resolve(__dirname, './src/assets'),
      'styles': path.resolve(__dirname, './src/assets/styles'),
      'images': path.resolve(__dirname, './src/assets/images'),
      'components': path.resolve(__dirname, './src/app/components')
    }
  }

  config.resolveLoader = {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    root: path.join(__dirname, 'node_modules')
  }

  config.devServer = {
    contentBase: PATHS.src,
    historyApiFallback: true,
    inline: true,
    progress: true,
    port: 8081,
    hot: true,
    stats: {
      colors: true
    }
  }

  return config
}

module.exports = webpackConfig()

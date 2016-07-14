import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import isDev from 'isdev';
import { Dir } from './src/config';

const TARGET = process.env.npm_lifecycle_event;

let Config = {
  entry: [
    'babel-polyfill',
    path.join(Dir.src, 'client.jsx'),
  ],
  output: {
    path: path.join(Dir.public, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    root: Dir.src,
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: Dir.src,
    }],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),      // Webpack 1.0
    // new webpack.optimize.OccurrenceOrderPlugin(),  // Webpack 2.0 fixed this mispelling
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

if (TARGET === 'build:prod' && !isDev) {
  Config = merge(Config, {
    bail: true,
    devtool: 'source-map',
    output: { publicPath: '/build/' },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        dropDebugger: true,
        dropConsole: true,
        compressor: {
          warnings: false,
        },
      }),
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }],
    },
  });
}

if (TARGET === 'server:prod' && !isDev) {
  Config = merge(Config, {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }],
    },
  });
}

if (TARGET === 'server:dev' && isDev) {
  Config = merge(Config, {
    devtool: 'eval',
    entry: ['webpack-hot-middleware/client'],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react-hmre'],
        },
      }],
    },
  });
}

const WebpackConfig = Config;
export default WebpackConfig;

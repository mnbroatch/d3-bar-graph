const path = require('path');
const webpack = require('webpack');

const build = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const devConfig = {
  devtool: 'eval-cheap-module-sourcemap',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index',
  ],
  output: {
    path: path.resolve(__dirname, 'bin'),
    publicPath: `http://localhost:${port}/`,
    pathInfo: true,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000?',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file?emitFile=false',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

const prodConfig = {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'bin', 'public'),
    publicPath: `http://localhost:${port}/`,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = (build === 'production') ? prodConfig : devConfig;

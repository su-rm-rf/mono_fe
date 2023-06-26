const { resolve } = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const client = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isClient': true,
      'process.env.isSSR': false,
    })
  ],
  devtool: 'eval-cheap-module-source-map',
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: resolve(__dirname, '../dist/.temp_cache'),
  // },
  optimization: {
    minimize: true,
  },
  target: 'web',
}

const ssr = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isClient': false,
      'process.env.isSSR': true,
    })
  ],
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: resolve(__dirname, '../dist/.temp_cache'),
  // },
  optimization: {
    minimize: true,
  },
  externalsPresets: { node: true },
  externals: [webpackNodeExternals()],
  target: 'node',
}

module.exports = {
  client_dev: client, 
  ssr_dev: ssr,
}
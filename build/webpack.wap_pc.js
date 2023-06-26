const { resolve, join } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { client_dev, ssr_dev } = require('./webpack.dev')
const { client_prod, ssr_prod } = require('./webpack.prod')

const NODE_ENV = process.env.NODE_ENV

const common2 = merge(common, {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.less'],
    alias: {
      '@': join(__dirname, '../apps/wap_pc/client'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
    })
  ],
})

const pj = 'wap_pc'
const entry_output_client = {
  entry: `./${pj}/client/main.tsx`,
  output: {
    path: resolve(__dirname, `../dist/${pj}`),
    filename: 'client.bundle.js',
    // chunkFilename: '[name].[chunkhash:8].css',
    publicPath: `/${pj}/`,
  },
}

const entry_output_ssr = {
  entry: `./${pj}/ssr/main.tsx`,
  output: {
    path: resolve(__dirname, `../dist/${pj}`),
    filename: 'ssr.bundle.js',
    publicPath: `/${pj}/`,
    globalObject: 'this',
  },
}

const client_dev_wap_pc = merge(common2, client_dev, entry_output_client)

const client_prod_wap_pc = merge(common2, client_prod, entry_output_client)

const ssr_dev_wap_pc = merge(common2, ssr_dev, entry_output_ssr)

const ssr_prod_wap_pc = merge(common2, ssr_prod, entry_output_ssr)

if (NODE_ENV === 'development') {
  module.exports = [client_dev_wap_pc, ssr_dev_wap_pc]
} else {
  module.exports = [client_prod_wap_pc, ssr_prod_wap_pc]
}
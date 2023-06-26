const { resolve, join } = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const common = require('./webpack.common')
const { client_dev, ssr_dev } = require('./webpack.dev')
const { client_prod, ssr_prod } = require('./webpack.prod')

const NODE_ENV = process.env.NODE_ENV

const common2 = merge(common, {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        }
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.vue', '.js', '.json', '.scss'],
    alias: {
      '@': join(__dirname, '../apps/admin/client')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ],
})

const entry_output_client = {
  entry: './admin/client/main.tsx',
  output: {
    path: resolve(__dirname, '../dist/admin'),
    filename: 'client.bundle.js',
    // chunkFilename: '[name].[chunkhash:8].css',
    publicPath: '/admin/',
  },
}

const entry_output_ssr = {
  entry: './admin/ssr/main.tsx',
  output: {
    path: resolve(__dirname, '../dist/admin'),
    filename: 'ssr.bundle.js',
    publicPath: '/admin/',
    globalObject: 'this',
  },
}

const client_dev_admin = merge(common2, client_dev, entry_output_client)

const client_prod_admin = merge(common2, client_prod, entry_output_client)

const ssr_dev_admin = merge(common2, ssr_dev, entry_output_ssr)

const ssr_prod_admin = merge(common2, ssr_prod, entry_output_ssr)

if (NODE_ENV === 'development') {
  module.exports = [client_dev_admin, ssr_dev_admin]
} else {
  module.exports = [client_prod_admin, ssr_prod_admin]
}

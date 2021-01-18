const webpackMerge = require('webpack-merge')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'eval-source-map',
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            warnings: false,
            // 删除注释
            drop_console: false,
            dead_code: false,
            drop_debugger: true
          },
          output: {
            // 删除注释
            comments: false,
            // 删除格式化
            beautify: false
          },
          mangle: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce: true
        }
      }
    }
  },
  stats: { children: false, warnings: false }
})

module.exports = webpackConfig

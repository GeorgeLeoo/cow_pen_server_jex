const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const utils = require('./utils')

const webpackConfig = {
    target: 'node',
    entry: {
        server: path.join(utils.SRC_PATH, 'index.js')
    },
    resolve: {
        ...utils.getWebpackResolveConfig()
    },
    output: {
        filename: '[name].bundle.js',
        path: utils.DIST_PATH
    },
    module: {
        rules: [
            {
                test: '/\.(js|jsx)$/',
                use: {
                    loader: 'babel-loader'
                },
                exclude: [path.join(utils.SRC_PATH, './node_modules')]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: (process.env.NODE_ENV === 'production' ||
                process.env.NODE_ENV === 'prod') ? "'production'" : "'development'"
            }
        })
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            minSize: 0,
            minChunks: 1,
            priority: 10,
            chunks: 'initial'
          },
          common: {
            name: 'common',
            test: /[\\/]src[\\/]/,
            minSize: 0,
            minChunks: 2,
            chunks: 'all'
          }
        }
      }
    }
}

module.exports = webpackConfig

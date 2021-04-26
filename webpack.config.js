const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isProd = (options) => options.mode === 'production'
const maybeExtractCSSPlugin = (options) =>
  isProd(options)
    ? new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    : undefined

const config = (env, options) => ({
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  mode: options.mode,
  devServer: {
    compress: true,
    open: true,
    hot: true,
    stats: 'minimal',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        // ts or tsx files will be transpiled to js by ts-loader
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // We use ForkTsCheckerWebpackPlugin for typechecking
          transpileOnly: true,
        },
      },
      {
        test: /(.module)?.less$/,
        use: [
          isProd(options) ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: '@teamsupercell/typings-for-css-modules-loader',
            options: {
              disableLocalsExport: true,
            },
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /\/node_modules\//,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    maybeExtractCSSPlugin(options),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/less\.d\.ts$/] }),
    new ForkTsCheckerWebpackPlugin({
      // For the dev server overlay to work
      async: false,
    }),
    new HtmlPlugin({
      title: 'Jesse Jaanila',
      favicon: path.resolve(__dirname, 'static', 'favicon.ico'),
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ].filter(Boolean),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
})

module.exports = config

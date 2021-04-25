const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isProd = (options) => options.mode === 'production'
const minimizeCSSPlugin = (options) =>
  isProd(options)
    ? new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
    : undefined
const optimizeHTMLPlugin = (options) =>
  isProd(options) ? new OptimizeCSSAssetsPlugin() : undefined

const config = (env, options) => ({
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  mode: options.mode,
  devServer: {
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
        exclude: /node_modules/,
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
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    minimizeCSSPlugin(options),
    optimizeHTMLPlugin(options),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({ paths: [/less\.d\.ts$/] }),
    new ForkTsCheckerWebpackPlugin({
      // For the dev server overlay to work
      async: false,
    }),
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      title: 'Jesse Jaanila',
      favicon: './static/clown-face.png',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ].filter(Boolean),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
})

module.exports = config

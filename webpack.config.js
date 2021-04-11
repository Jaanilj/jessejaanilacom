const path = require('path')
const webpack = require('webpack') //to access built-in plugins
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProd = (options) => options.mode === 'production'

module.exports = (env, options) => [
  {
    target: 'web',
    entry: './src/index.tsx',
    mode: options.mode,
    module: {
      rules: [
        {
          // all files with a `.ts` or '.tsx' extension will be handled by 'babel-loader' and 'ts-loader'
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
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
      splitChunks: { chunks: 'all' },
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      isProd(options)
        ? new MiniCssExtractPlugin({ filename: '[name].css' })
        : undefined,
      isProd(options) ? new OptimizeCSSAssetsPlugin({}) : undefined,
      new webpack.WatchIgnorePlugin({ paths: [/less\.d\.ts$/] }),
      new CleanWebpackPlugin(),
      new HtmlPlugin({
        title: 'Jesse Jaanila',
        favicon: './static/clown-face.png',
        template: path.resolve(__dirname, 'src', 'index.html'),
      }),
    ].filter(Boolean),
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
]

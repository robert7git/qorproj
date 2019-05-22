const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rootDir = path.resolve(__dirname, '../')

const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

/* ------------------------------------------------------
* webpack dev 配置
------------------------------------------------------ */
module.exports = {
  context: rootDir,
  mode: 'production',
  // devtool: 'source-map', // cheap-module-source-map
  entry: './src/app.jsx',
  output: {
    path: path.join(rootDir, 'dist'),
    filename: 'app.js'
    // publicPath: 'http://localhost:3001/dist/'
  },
  //
  // resolve
  // ------------------------------------------------------
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  //
  // externals
  // ------------------------------------------------------
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      //
      // js
      // ------------------------------------------------------
      {
        type: 'javascript/auto',
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /src\/assets/],
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              configFile: path.join(rootDir, './.babelrc')
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: path.join(rootDir, './.eslintrc.js')
            }
          }
        ]
      },
      //
      // style
      // ------------------------------------------------------
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: false,
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: { includePaths: [path.resolve(rootDir, './src/assets')] }
          }
        ]
      },
      {
        test: sassModuleRegex,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 2,
              localIdentName: '[name]--[local]-[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: { includePaths: [path.resolve(rootDir, './src/assets')] }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]--[local]-[hash:base64:5]',
          'postcss-loader',
          'less-loader'
        ]
      },
      //
      // template
      // ------------------------------------------------------
      {
        test: /\.ejs$/,
        use: 'ejs-loader'
      },
      //
      // file
      // ------------------------------------------------------
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 /* 小于8k的图片自动转成base64格式，并且不会存在实体图片 */,
              outputPath: 'images/' /* 图片打包后存放的目录 */
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|ott|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'fonts/' /* publicPath: '/', */
          }
        }
      }
    ]
  },
  //
  // devServer
  // ------------------------------------------------------
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    index: 'index.html',
    overlay: {
      warnings: false,
      errors: true
    },
    hot: true,
    publicPath: '/',
    contentBase: path.join(rootDir, 'dist'),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    //
    // proxy
    // ------------------------------------------------------
    proxy: {
      '/api': {
        target: 'http://localhost:7000'
        // secure: false
        // pathRewrite: { '^/api': '' }
      },
      '/public/upload': {
        target: 'http://localhost:9000'
        // secure: false
      }
    }
  },
  //
  // plugins
  // ------------------------------------------------------
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.ejs',
      inject: true,
      minify: {}
      // chunksSortMode: 'dependency',
      // chunks: ['app', 'vender'], // 将runtime插入html中
      // hash:true,
    })
  ]
}

// function getIPAdress() {
//   let interfaces = require('os').networkInterfaces()
//   for (var devName in interfaces) {
//     let iface = interfaces[devName]
//     for (let i = 0; i < iface.length; i++) {
//       let alias = iface[i]
//       if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//         return alias.address
//       }
//     }
//   }
// }

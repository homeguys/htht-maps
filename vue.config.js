const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime()

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = '我的vue3.0'
      return args
    })
  },
  transpileDependencies: true,
  configureWebpack: {
    name: 'vue-cesium',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new NodePolyfillPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'node_modules/cesium/Build/Cesium/Workers',
            to: 'cesium/Workers'
          },
          {
            from: 'node_modules/cesium/Build/Cesium/ThirdParty',
            to: 'cesium/ThirdParty'
          },
          {
            from: 'node_modules/cesium/Build/Cesium/Assets',
            to: 'cesium/Assets'
          },
          {
            from: 'node_modules/cesium/Build/Cesium/Widgets',
            to: 'cesium/Widgets'
          }
        ]
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('./cesium')
      }),
      // 使Cesium对象实例可在每个js中使用而无须import
      new webpack.ProvidePlugin({
        Cesium: ['cesium/Source/Cesium']
      }),
      new MonacoWebpackPlugin()
    ],
    module: {
      rules: [
        {
          test: /.js$/,
          include: /(cesium)/,
          use: {
            loader: '@open-wc/webpack-import-meta-loader'
          }
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      // 你的基础样式 因为没有我就注释了
      // sass: {
      //     data: `
      // 		@import "@/assets/style/base.scss";
      // 	`,
      // },
      //这只主题样式，修改此文件后需要重新启动，
      less: {
        lessOptions: {
          modifyVars: {
            //这是配置css主题色
            'primary-color': '#fd46f6'
          },
          javascriptEnabled: true
        }
      }
    },
    // 每次打包后生成的css携带时间戳
    extract: {
      filename: `css/[name].${Timestamp}.css`,
      chunkFilename: `css/[name].${Timestamp}.css`
    }
  }
})

// const Timestamp = new Date().getTime()
// module.exports = {
//     chainWebpack: config => {
//         config.plugin('html').tap(args => {
//             args[0].title = '我的vue3.0' //这个是网站标题
//             return args
//         })
//     },
//     css: {
//         loaderOptions: {
//             // 你的基础样式 因为没有我就注释了
//             // sass: {
//             //     data: `
//             // 		@import "@/assets/style/base.scss";
//             // 	`,
//             // },
//             //这只主题样式，修改此文件后需要重新启动，
//             less: {
//                 lessOptions: {
//                     modifyVars: {
//                       //这是配置css主题色
//                       'primary-color': '#007AFF',
//                     },
//                     javascriptEnabled: true,
//                 },
//             },
//         },
//         // 每次打包后生成的css携带时间戳
//         extract: {
//             filename: `css/[name].${Timestamp}.css`,
//             chunkFilename: `css/[name].${Timestamp}.css`,
//         },
//     },
//     productionSourceMap: false,
//     //打包后相对目录
//     publicPath: process.env.NODE_ENV === 'production' ? '././' : './',
//     configureWebpack: {
//         //每次打包后生成的js携带时间戳
//         output: {
//             filename: `[name].${Timestamp}.js`,
//             chunkFilename: `[name].${Timestamp}.js`,
//         },
//     },
// }

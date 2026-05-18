'use strict'
const path = require('path')


const webpack = require('webpack')
// const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const defaultSettings = require('./src/settings.js')
const px2rem = require('postcss-px2rem')
const postcss = px2rem({
  //配置rem基准值 基准大小 baseSize，需要和rem.js中相同
  remUnit: 100
})


function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '中科教学实训平台' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',//（放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录）
  lintOnSave: true,
  productionSourceMap: false,




  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 这里配置 '/api' 就等价于 target , 你在链接里访问 /api === http://localhost:54321

      '/edu': {
        target: 'http://172.18.0.185:32008',
        // target: 'http://172.18.0.215:20211',

        // secure: true, // 如果是 https ,需要开启这个选项
        changeOrigin: true, // 是否是跨域请求?肯定是啊,不跨域就没有必要配置这个proxyTable了.
        pathRewrite: { // 重写路径  例如浏览器请求地址http://localhost:12345/xxx,实际请求的是你代理的地址：http:xxx/11111
          // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.
          '^/edu/*': '', // 和下边两种写法，因人而异根据需求。
          // 等价于    /api + /api  ==  http://localhost:54321/api
          // 如果写为 '^/api' : '/'
          // 等价于   /api + /  ==  http://localhost:54321/
          // 这里的 /api ==  http://localhost:54321
        }
      },
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面两项配置才是 compression-webpack-plugin 压缩配置
      // 压缩成 .gz 文件
      // new CompressionPlugin({
      //   filename: '[path][base].gz',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.css$|\.html$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),
      // 压缩成 .br 文件，如果 zlib 报错无法解决，可以注释这段使用代码，一般本地没问题，需要注意线上服务器会可能发生找不到 zlib 的情况。
      // new CompressionPlugin({
      //   filename: '[path][base].br',
      //   algorithm: 'brotliCompress',
      //   test: /\.(js|css|html|svg)$/,
      //   compressionOptions: {
      //     params: {
      //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11
      //     }
      //   },
      //   threshold: 10240,
      //   minRatio: 0.8
      // }),

    ],
    // 开启分离 js
    optimization: {
      mergeDuplicateChunks: true, // 合并相同的 chunk
      // runtimeChunk: 'manifest',
      // runtimeChunk: 'single',
      splitChunks: {
        chunks: 'async',//表示将选择哪些块进行优化。提供字符的有效值为all、async和initial,默认是仅对异步加载的块进行分割。
        minSize: 100 * 1024,//模块大于minSize时才会被分割出来。默认100k
        maxSize: 0,//生成的块的最大大小，如果超过了这个限制，大块会被拆分成多个小块。
        minChunks: 1,//拆分前必须共享模块的最小块数。
        maxAsyncRequests: 5,//按需加载时并行请求的最大数目。
        maxInitialRequests: 3,//入口点的最大并行请求数
        automaticNameDelimiter: '~',//默认情况下，webpack将使用块的来源和名称（例如vendors~main.js）生成名称。此选项允许您指定要用于生成的名称的分隔符。
        automaticNameMaxLength: 30,//允许为SplitChunksPlugin生成的块名称的最大长度
        name: true,
        cacheGroups: {
          elementUI: {
            priority: 20,
            name: 'element-ui',
            test: /element-ui/,
            reuseExistingChunk: true
          },
          vendor: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,//控制此缓存组选择的模块。省略它将选择所有模块。它可以匹配绝对模块资源路径或块名称。匹配块名称时，将选择块中的所有模块。
            minChunks: 1,
            // maxInitialRequests: 12,
            maxAsyncRequests: 5,
            minSize: 100 * 1024,
            maxSize: 5 * 1000 * 1024,
            priority: -10//一个模块可以属于多个缓存组,模块出现在优先级最高的缓存组中
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true//如果当前块包含已经从主包中分离出来的模块，那么该模块将被重用，而不是生成新的模块
          }
        }
      }
    },

    //警告 webpack 的性能提示
    performance: {
      hints: 'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 40000000,
      //只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  css: {
    loaderOptions: {
      //全局配置utils.scss,详细配置参考vue-cli官网
      sass: {
        // prependData: `@use "@/styles/utils.scss" as *;`,
        prependData: '@import "@/styles/utils.scss";'
      },
      less: {
        javascriptEnabled: true,
      },
      postcss: {
        plugins: [
          postcss
        ]
      }

    }

  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin)


    let miniCssExtractPlugin = new MiniCssExtractPlugin({
      filename: 'assets/[name].[hash:8].css',
      chunkFilename: 'assets/[name].[hash:8].css'
    })
    config.plugin('extract-css').use(miniCssExtractPlugin)

  }
}

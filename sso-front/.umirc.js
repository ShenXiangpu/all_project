import { resolve } from 'path'

export default {
  ignoreMomentLocale: true,
  targets: {
    chrome: 50,
    edge: 13,
    firefox: 45,
    ie: 11,
    ios: 11,
    safari: 10,
  },
  treeShaking: true,

  urlLoaderExcludes: [/\.svg$/],
  chainWebpack(config) {
    config.module
      .rule('svg')
      .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
      .use([
        {
          loader: 'babel-loader',
        },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true,
          },
        },
      ])
      .loader(require.resolve('@svgr/webpack'));
  },

  plugins: [
    ['umi-plugin-react', {
      dva: { immer: true },
      antd: true,  // antd 默认不开启，如有使用需自行配置
      dynamicImport: {
        webpackChunkName: true,
        loadingComponent: './components/Loader/Loader',
        level: 3,
      },
      routes: {
        exclude: [
          /model\.(j|t)sx?$/,
          /service\.(j|t)sx?$/,
          /models\//,
          /components\//,
          /services\//,
        ],
      },
      metas: [
        {
          charset: 'utf-8',
        },
        {
          viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
        }
      ],
      // hardSource: true
      headScripts: [
        { src: '/browerVersion.js' },
        { src: '/wmks/js/jquery.min.js' },
        { src: '/wmks/js/jquery-ui.js' },
        { src: '/wmks/js/wmks.min.js' },
      ],
    }],
  ],

  uglifyJSOptions(opts) {
    //去掉console.log打印与debugger调试
    opts.uglifyOptions.compress.drop_debugger = true;
    opts.uglifyOptions.compress.drop_console = true;
    return opts;
  },

  alias: {
    api: resolve(__dirname, './src/services/'),
    assets: resolve(__dirname, './src/assets/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    services: resolve(__dirname, './src/services'),
    utils: resolve(__dirname, './src/utils'),
  },

  // "publicPath": "/static/",
  proxy: {
    "/service": {
      target: "http://172.18.0.185:32005",  // 线上
      changeOrigin: true,
      pathRewrite: { "^/service": "" }
    },
    "/openService": {
      target: "http://124.135.23.222:8081", //线上
      changeOrigin: true,
      pathRewrite: { "^/openService": "" }
    },
    "/group1": {      // 图片地址
      target: "http://172.18.0.171:8888",
      changeOrigin: true,
    },
    "/ws/": {
      target: "ws://172.18.0.55:30411",   // 线上
      changeOrigin: true,
      ws: true, // 开启ws
      secure: false,
      pathRewrite: { "^/wsmsg": "" },
    },
  }
}

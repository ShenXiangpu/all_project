import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import legacy from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueJsx from "@vitejs/plugin-vue-jsx";
import requireTransform from "vite-plugin-require-transform"; //放在vueJsx之后
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [
    vue({
      jsx: true,
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
    vueJsx({
      // 配置 Vue JSX 插件选项
      enableObjectSlots: true,
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/,
    }),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "CRM Front",
        },
      },
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: "vue/dist/vue.esm.js",
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/variables.scss"; @import "@/styles/mixin.scss";`,
      },
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/crm": {
        target: "http://172.18.0.185:30910",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/crm/, ""),
      },
    },
  },
  build: {
    target: "es2015",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router", "vuex"],
          "element-ui": ["element-ui"],
          echarts: ["echarts"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "vuex", "element-ui", "echarts"],
  },
});

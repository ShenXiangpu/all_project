// vite.config.js
import { defineConfig } from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite@4.5.14_@types+node@24.10.2_sass@1.95.0_terser@5.44.1/node_modules/vite/dist/node/index.js";
import { createVuePlugin } from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite-plugin-vue2@2.0.3_ejs@_450d0c85f0cb86ba6b75feb1d9c4d82e/node_modules/vite-plugin-vue2/dist/index.js";
import legacy from "file:///E:/spaces/crm-front/node_modules/.pnpm/@vitejs+plugin-legacy@4.1.1_dbd9e4cfcb5394d8863f7aa02341470d/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { createHtmlPlugin } from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite-plugin-html@3.2.2_vite_55909b16181b9ddb397b11b7df7f9883/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_849dc873ec9b79cda795aa31b4c6407a/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite-plugin-mock@2.9.8_mock_82c2026bf7aa49e2f664c788850a71a4/node_modules/vite-plugin-mock/dist/index.js";
import requireTransform from "file:///E:/spaces/crm-front/node_modules/.pnpm/vite-plugin-require-transform@1.0.21/node_modules/vite-plugin-require-transform/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "E:\\spaces\\crm-front";
var vite_config_default = defineConfig({
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "CRM Front"
        }
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    }),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true
    }),
    requireTransform({
      fileRegex: /.js$|.vue$/
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "vue": "vue/dist/vue.esm.js"
      // 确保使用完整版 Vue
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  build: {
    target: "es2015",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vue-vendor": ["vue", "vue-router", "vuex"],
          "element-ui": ["element-ui"],
          "echarts": ["echarts"]
        }
      }
    }
  },
  optimizeDeps: {
    include: ["vue", "vue-router", "vuex", "element-ui", "echarts"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxzcGFjZXNcXFxcY3JtLWZyb250XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxzcGFjZXNcXFxcY3JtLWZyb250XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9zcGFjZXMvY3JtLWZyb250L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyZWF0ZVZ1ZVBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZTInXG5pbXBvcnQgbGVnYWN5IGZyb20gJ0B2aXRlanMvcGx1Z2luLWxlZ2FjeSdcbmltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmltcG9ydCByZXF1aXJlVHJhbnNmb3JtIGZyb20gJ3ZpdGUtcGx1Z2luLXJlcXVpcmUtdHJhbnNmb3JtJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGNyZWF0ZVZ1ZVBsdWdpbigpLFxuICAgIGxlZ2FjeSh7XG4gICAgICB0YXJnZXRzOiBbJ2llID49IDExJ10sXG4gICAgICBhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSddXG4gICAgfSksXG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiAnQ1JNIEZyb250J1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSksXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9pY29ucy9zdmcnKV0sXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xuICAgIH0pLFxuICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICAgIGxvY2FsRW5hYmxlZDogdHJ1ZVxuICAgIH0pLFxuICAgIHJlcXVpcmVUcmFuc2Zvcm0oe1xuICAgICAgZmlsZVJlZ2V4OiAvLmpzJHwudnVlJC9cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgJ3Z1ZSc6ICd2dWUvZGlzdC92dWUuZXNtLmpzJyAvLyBcdTc4NkVcdTRGRERcdTRGN0ZcdTc1MjhcdTVCOENcdTY1NzRcdTcyNDggVnVlXG4gICAgfSxcbiAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIjtgXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwLFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzMjAxNScsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAndnVlLXZlbmRvcic6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVleCddLFxuICAgICAgICAgICdlbGVtZW50LXVpJzogWydlbGVtZW50LXVpJ10sXG4gICAgICAgICAgJ2VjaGFydHMnOiBbJ2VjaGFydHMnXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3Z1ZXgnLCAnZWxlbWVudC11aScsICdlY2hhcnRzJ11cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxZQUFZO0FBQ25CLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sc0JBQXNCO0FBQzdCLE9BQU8sVUFBVTtBQVBqQixJQUFNLG1DQUFtQztBQVN6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxnQkFBZ0I7QUFBQSxJQUNoQixPQUFPO0FBQUEsTUFDTCxTQUFTLENBQUMsVUFBVTtBQUFBLE1BQ3BCLDJCQUEyQixDQUFDLDZCQUE2QjtBQUFBLElBQzNELENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQSxNQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUFBLE1BQ3ZELFVBQVU7QUFBQSxJQUNaLENBQUM7QUFBQSxJQUNELGNBQWM7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsSUFDRCxpQkFBaUI7QUFBQSxNQUNmLFdBQVc7QUFBQSxJQUNiLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDbEMsT0FBTztBQUFBO0FBQUEsSUFDVDtBQUFBLElBQ0EsWUFBWSxDQUFDLFFBQVEsT0FBTyxPQUFPLFFBQVEsUUFBUSxTQUFTLE1BQU07QUFBQSxFQUNwRTtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osY0FBYyxDQUFDLE9BQU8sY0FBYyxNQUFNO0FBQUEsVUFDMUMsY0FBYyxDQUFDLFlBQVk7QUFBQSxVQUMzQixXQUFXLENBQUMsU0FBUztBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsT0FBTyxjQUFjLFFBQVEsY0FBYyxTQUFTO0FBQUEsRUFDaEU7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=

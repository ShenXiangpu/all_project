// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 全局引入 expect, it, describe 等 API，避免每个文件都 import
    globals: true, 
    // 测试环境，Node.js 后端用 'node'，前端项目用 'jsdom' 或 'happy-dom'
    environment: 'node', 
    // 包含测试文件的匹配模式
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 覆盖率报告配置（可选）
    coverage: {
      provider: 'v8', // 或 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
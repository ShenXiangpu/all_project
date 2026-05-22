// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 全局引入 API (如 describe, it, expect)，无需在每个文件中 import
    globals: true,
    // 模拟浏览器环境 (如果项目是前端项目)
    environment: 'node',
    // 设置测试文件的匹配模式
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // 覆盖率报告配置 (可选)
    coverage: {
      provider: 'v8', // 或 'istanbul'
      reporter: ['text', 'json', 'html'],
    },
  },
})
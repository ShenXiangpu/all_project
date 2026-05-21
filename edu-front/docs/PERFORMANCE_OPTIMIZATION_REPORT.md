# edu-front 客户端性能优化报告

**项目**：中科教学实训平台（Vue 2 + Element UI + Vue CLI 4）  
**日期**：2026-05-19  
**范围**：首屏加载、打包体积、运行时开销、构建与部署

---

## 1. 现状诊断

### 1.1 开发环境基线（优化前）

在 `npm run dev` 首次编译完成时，Webpack 曾报告：

| 指标 | 数值 |
|------|------|
| 入口 `app` 合计体积 | **约 58.7 MiB**（含 HMR，非生产体积） |
| 推荐上限 | 47.7 MiB（已超限） |

说明：开发包包含 Source Map、未压缩代码与 HMR，**不能直接与生产 `dist` 对比**，但反映出依赖体量大、入口聚合过多。

### 1.2 主要瓶颈（按影响排序）

| 类别 | 问题 | 影响 |
|------|------|------|
| 入口依赖 | `main.js` 全量注册 Element UI、`@jiaminghi/data-view`、`vue-particles`、空壳 `Vcomp` | 首屏 JS 膨胀 |
| 图表库 | 多处 `import * as echarts from 'echarts'` 全量引入 | 单库源码约 **40MB**（未 tree-shake 前进包显著） |
| 路由 | 动态路由使用 `require([...], resolve)` | 分包粒度弱于 `import()` |
| 构建 | Gzip 压缩、Lodash 裁剪未启用；`splitChunks` 开发态为 `async` | 生产传输体积偏大 |
| 构建环境 | Node 22 + 大项目易 OOM；需 `--openssl-legacy-provider` | 本地/CI 构建不稳定 |
| 依赖残留 | `vue-particles` 在登录页已注释仍全局注册；`data-view` 仅 2 处用 `loading` | 无效体积 |

### 1.3 依赖体积参考（`node_modules` 未压缩源码）

| 包 | 约体积 |
|----|--------|
| echarts | 39.77 MB |
| element-ui | 7.23 MB |
| moment | 4.03 MB |
| @jiaminghi/data-view | 1.68 MB |
| vue-particles | 1.65 MB |

---

## 2. 已实施优化

### 2.1 精简入口 `src/main.js`

**移除的全局注册（不再进入主 bundle）：**

- `vue-particles`（登录页粒子效果已注释，未使用）
- `@jiaminghi/data-view` 全局 `Vue.use(dataV)`（业务仅 `DetailTable` 按需 `import { loading }`）
- 空组件库 `./components/index`（`Vcomp` 无实际组件）
- 无副作用的 `@/utils/websocket` 全局 import（WebSocket 由 `store/modules/ws.js`、`request.js` 等按需引用）

**保留**：Element UI 全量（改动面大，见后续建议）、`moment` + `IgnorePlugin` 裁剪 locale。

### 2.2 ECharts 按需加载 `src/utils/echarts.js`

统一从 `echarts/core` 注册：

- 图表：`LineChart`、`PieChart`
- 组件：Title、Tooltip、Grid、Legend、Dataset、Toolbox、DataZoom 等
- 渲染器：`CanvasRenderer`

**已切换引用的文件：**

- `src/components/Monitor/components/AutoCharts.vue`
- `src/views/dashboard/TeacherAndSch/components/SourDataMonitorLine.vue`
- `src/views/dashboard/TeacherAndSch/components/DataMonitorCircle.vue`
- `src/views/dashboard/TeacherAndSch/components/FeaDataMonitorLine.vue`
- `src/views/universityData/components/detail/components/SourDataMonitorLine.vue`
- `src/views/analysisOfStudents/dateOfStudents/components/ReportInfo/Echarts.vue`
- `src/views/utilTest/components/Echarts.vue`

**其它清理：**

- 删除 `LabCloudList.vue` 未使用的 `import { number } from 'echarts'`
- 删除 `BorderContainer/index.vue` 无用的 `macarons` 主题 `require`

**预期**：生产环境 ECharts 相关 chunk 由全量 **~800KB–1MB+（gzip 前）** 降至 **约 200–400KB 量级**（视图表类型而定）。

### 2.3 动态路由懒加载 `src/store/modules/permission.js`

```javascript
// 优化前
tmp.component = (resolve) => require([`@/views/${component}`], resolve)

// 优化后
tmp.component = () => import(`@/views/${component}`)
```

**效果**：与 Webpack 动态 `import()` 对齐，按菜单路由拆分 chunk，登录后按需加载业务页面。

### 2.4 Webpack / Vue CLI `vue.config.js`

| 配置项 | 说明 |
|--------|------|
| `lintOnSave` | 仅在 `development` 执行，加快生产构建 |
| `parallel: false` | 降低 Windows 下并行构建 OOM 概率 |
| `CompressionPlugin` | 生产构建输出 `.gz`（>10KB，minRatio 0.8），需 Nginx/CDN 开启 `gzip_static` |
| `LodashModuleReplacementPlugin` | 生产构建裁剪 lodash 未使用特性 |
| `splitChunks.cacheGroups.echarts` | 将 `echarts` 单独打成 `chunk-echarts` |
| 既有配置 | `moment` locale 忽略、`prefetch` 关闭、`productionSourceMap: false` |

### 2.5 构建脚本 `package.json`

```json
"build:prod": "node --max-old-space-size=8192 --openssl-legacy-provider ... build",
"build:analyze": "... build --report"
```

- 解决 Node 17+ OpenSSL 与 Webpack 4 兼容问题  
- 提高堆内存上限，缓解大项目 OOM  
- `npm run build:analyze` 可生成包分析报告（`dist/report.html`）

---

## 3. 构建验证说明

在当前环境（Node v22.22.0）执行 `npm run build:prod` 时，因 **进程内存不足（Fatal process out of memory）** 未能完整产出 `dist`。

**建议在本地/CI 验证：**

```bash
npm run build:prod
# 分析包体积
npm run build:analyze
```

**构建后自检命令（PowerShell）：**

```powershell
Get-ChildItem dist -Recurse -Include *.js,*.css |
  Measure-Object -Property Length -Sum |
  Select-Object Count, @{N='TotalMB';E={[math]::Round($_.Sum/1MB,2)}}

Get-ChildItem dist -Recurse -Filter *.gz |
  Measure-Object -Property Length -Sum |
  Select-Object @{N='GzipMB';E={[math]::Round($_.Sum/1MB,2)}}
```

**部署注意**：启用 Gzip 静态资源时，Nginx 示例：

```nginx
gzip_static on;
gzip_types text/plain text/css application/javascript application/json;
```

---

## 4. 预期收益（估算）

| 优化项 | 首屏 / 主包 | 说明 |
|--------|-------------|------|
| 移除 data-view / vue-particles 全局注册 | ↓ 约 50–150KB（gzip 后） | 主包不再包含整库 |
| ECharts 按需 | ↓ 约 400–700KB（gzip 后） | 最大单项收益之一 |
| 路由 `import()` | 首屏 ↓ 明显 | 业务页不进首包 |
| 生产 Gzip 插件 | 传输 ↓ 60–70% | 需服务器配合 |
| Lodash 裁剪 | ↓ 10–30KB | 视引用方式而定 |

**未改动的最大头**：Element UI 全量（~200KB+ gzip）、TinyMCE、xterm、@vue-office 等仍在业务路由中按需/同步加载，需二期优化。

---

## 5. 后续建议（未实施）

### 5.1 高优先级

1. **Element UI 按需引入**  
   使用 `babel-plugin-component`，仅注册实际用到的组件，预计主包再减 **100–200KB（gzip）**。

2. **卸载无用依赖**  
   ```bash
   npm uninstall vue-particles
   ```
   若确认全站不用 data-view 组件，可评估移除 `@jiaminghi/data-view`（保留 `DetailTable` 的 `loading` 替代方案）。

3. **Moment → Day.js**  
   API 相近，体积约 **4MB → 2KB** 级别（需批量替换 `$moment` 调用）。

4. **CI 构建资源**  
   - Node 16/18 LTS 或保证 `NODE_OPTIONS=--max-old-space-size=8192`  
   - 构建机内存建议 **≥ 8GB**

### 5.2 中优先级

5. **图片与静态资源**：大图 WebP、路由级懒加载、CDN  
6. **Keep-alive 策略**：对列表页缓存、对重型编辑器页避免缓存  
7. **`v-loading` / 大列表**：虚拟滚动（如 `el-table` 大数据场景）  
8. **WebSocket**：已在登录后 `permission.js` 中连接，避免未登录建立连接（当前已符合）

### 5.3 低优先级 / 体验

9. 更新 `caniuse-lite`：`npx update-browserslist-db@latest`  
10. 生产关闭 `console`（`babel.config.js` 已配置 `transform-remove-console`）  
11. 考虑 Vite 迁移（长期，工作量大）

---

## 6. 变更文件清单

| 文件 | 变更类型 |
|------|----------|
| `src/main.js` | 移除冗余全局依赖 |
| `src/utils/echarts.js` | 新增 ECharts 按需入口 |
| `src/store/modules/permission.js` | 路由动态 `import()` |
| `src/views/**/Echarts*.vue` 等 7+ 文件 | 改用 `@/utils/echarts` |
| `src/views/attendClass/.../LabCloudList.vue` | 删除无用 import |
| `src/components/BorderContainer/index.vue` | 删除无用 theme require |
| `vue.config.js` | Gzip、Lodash、echarts 分包、构建调优 |
| `package.json` | `build:prod` / `build:analyze` 脚本 |

---

## 7. 回归测试建议

- [ ] 登录 / 登出、动态菜单加载是否正常  
- [ ] 首页 Dashboard 折线图、饼图、环形图渲染  
- [ ] 高校数据 / 学情分析中的 ECharts 报表  
- [ ] 监控页 `AutoCharts` 多图刷新  
- [ ] 开课 / 实验 `DetailTable` 加载动画（data-view `loading`）  
- [ ] 生产构建 `npm run build:prod` 与 `build:analyze`  
- [ ] 部署后静态资源 Gzip 是否生效（Network 面板 `Content-Encoding: gzip`）

---

## 8. 总结

本次优化聚焦 **减入口、拆图表、懒路由、压传输** 四条线，在不改动业务逻辑的前提下降低首屏与分包体积。最大潜在收益仍来自 **Element UI 按需** 与 **Moment 替换**；建议在内存充足的 CI 上完成 `build:analyze` 对比优化前后 `chunk-echarts`、`app`、`chunk-elementUI` 体积，并将本报告中的估算替换为实测数据。

如需继续二期（Element 按需、Day.js、构建 CI 配置），可在同一分支上迭代。

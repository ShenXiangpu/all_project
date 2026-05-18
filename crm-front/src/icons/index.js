import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

// register globally
Vue.component('svg-icon', SvgIcon)

// 导入所有 SVG 文件
const modules = import.meta.glob('./svg/*.svg', { eager: true })
console.log("modules=============",modules);

// 触发所有模块的导入
Object.keys(modules).forEach(key => {
  // 什么都不需要做，import.meta.glob 的 eager: true 已经处理了导入
})

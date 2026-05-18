// requireIcons.js
const icons = []

// 使用 import.meta.glob 导入所有 SVG 文件
const svgModules = import.meta.glob('../../icons/svg/*.svg', { eager: true, import: 'default' })

// 遍历所有导入的文件并提取图标名称
for (const path in svgModules) {
  // 使用正则表达式提取文件名（去除 ./ 和 .svg 扩展名）
  const fileName = path.replace('../../icons/svg/', '').replace('.svg', '')
  icons.push(fileName)
}

export default icons

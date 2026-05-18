import elDraw from './elDraw'

const install = function(Vue) {
  Vue.directive('el-draw', elDraw)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.elDraw = elDraw
  window.Vue.use({ install })
}

elDraw.install = install
export default elDraw

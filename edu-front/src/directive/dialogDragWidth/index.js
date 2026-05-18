import dialogDragWidth from './dialogDragWidth'

const install = function(Vue) {
  Vue.directive('dialogDragWidth', dialogDragWidth)
}

if (window.Vue) {
  window['dialogDragWidth'] = dialogDragWidth
  Vue.use(install); // eslint-disable-line
}

dialogDragWidth.install = install
export default dialogDragWidth
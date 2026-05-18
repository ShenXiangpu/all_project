import watermarker from './watermarker'

const install = function (Vue) {
    Vue.directive('watermarker', watermarker)
}

if (window.Vue) {
    window['watermarker'] = watermarker
    Vue.use(install); // eslint-disable-line
}

watermarker.install = install
export default watermarker

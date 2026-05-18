import store from '@/store'

function addWatermarker(el, binding) {
  const { value } = binding
  console.log(el.ext);
  // const roles = store.getters && store.getters.roles
  if (value) {
    let text = value || '水印'

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(150, 150, 150, 0.5)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 计算水印的宽度和高度
    const textWidth = ctx.measureText(text).width;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = textWidth * dpr;
    canvas.height = 30 * dpr;
    canvas.style.width = textWidth + 'px';
    canvas.style.height = '30px';
    ctx.fillText(text, textWidth / 2, 15 * dpr);

    // 设置水印的div样式
    const style = el.style;
    style.position = 'relative';
    style.zIndex = '7777';
    style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
    style.backgroundSize = '1% 1%';
    console.log(el.style.backgroundImage);
    // 将canvas添加到body中，防止被垃圾回收
    // document.body.appendChild(canvas);
    // if (value.length > 0) {
    //   const permissionRoles = value

    //   const hasPermission = roles.some(role => {
    //     return permissionRoles.includes(role)
    //   })

    //   if (!hasPermission) {
    //     el.parentNode && el.parentNode.removeChild(el)
    //   }
    // }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    addWatermarker(el, binding)
  },
  update(el, binding) {
    addWatermarker(el, binding)
  }
}

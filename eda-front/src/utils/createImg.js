import html2canvas from 'html2canvas'

export function clickGeneratePicture(domIdName) {
    // html2canvas(this.$refs.imageDom).then(canvas => {
    //   this.imageUrl = canvas.toDataURL('image/jpeg');
    // })
    const canvasDom = document.getElementById(domIdName)//获取当前DOM元素
    setTimeout(() => {
        createdIMG(canvasDom)//对当前DOM元素进行转化
    }, 2000)

}

export function createPiceture() {
    var eleLink = document.createElement("a");
    eleLink.href = this.imageUrl
    eleLink.download = '图片';
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.appendChild(eleLink);
}


export function createdIMG(canvasValue) {
    const canvas = document.createElement('canvas')
    const canvasDom = canvasValue

    const width = canvasDom.offsetWidth
    const height = canvasDom.offsetHeight
    console.log('获取指定的宽高', width, height)
    var scalue = 4 // 宽高扩大 2 倍 处理图片模糊
    canvas.width = width * scalue
    canvas.height = height * scalue
    const options = {
        backgroundColor: null,
        canvas: canvas,
        useCORS: true, // 配置允许跨域
        scale: scalue,
        width: width,
        height: height,
        background: '#fff', // 一定要添加背景颜色，否则出来的图片，背景全部都是透明的
        allowTaint: true,
        /* eslint-disable no-dupe-keys */
        useCORS: true /* 使用跨域 */
    }
    html2canvas(canvasDom, options)
        .then((canvas) => {
            try {
                // 生成图片地址
                console.log(
                    "canvas.toDataURL('image/jpeg')",
                    canvas.toDataURL('image/jpeg')
                )
                this.imageUrl = canvas.toDataURL('image/jpeg')
                // this.imageUrl.style.width = '100%'

            } catch (e) {
                console.log('生成失败' + e)
            }
        })
        .catch((err) => {
            console.log('绘制失败', err)
        })
}
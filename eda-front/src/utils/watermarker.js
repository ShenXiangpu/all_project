// 水印类
class Watermarker {
    constructor(text) {
        this.text = text;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    set(el) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const text = this.text;

        // 设置水印的样式
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
        style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')';
        style.backgroundSize = '100% 100%';

        // 将canvas添加到body中，防止被垃圾回收
        document.body.appendChild(canvas);
    }
}


// export default Watermarker;
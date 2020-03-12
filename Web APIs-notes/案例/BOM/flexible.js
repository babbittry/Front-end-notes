(function flexible(window, document) {
    // 获取 html 的根元素
    var docEl = document.documentElement;
    // 物理像素比
    var dpr = window.devicePixelRatio || 1;

    if (document.body) {
        document.body.style.fontsize = (12 * dpr) + 'px';
    } else {
        // 如果页面中没有 body 这个元素，就等着页面主要的 DOM 元素加载完毕
        // 之后再去设置 body 的字体大小
        document.addEventListener('DOMContentLoaded', setBosyFontSize);
    }
}(window, document));
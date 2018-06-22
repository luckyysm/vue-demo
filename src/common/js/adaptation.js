//(function (doc, win) {
//    // 分辨率Resolution适配
//    var docEl = doc.documentElement,
//        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//        recalc = function () {
//            var clientWidth = docEl.clientWidth;
//            if (!clientWidth) return;
//            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
//        };
//    // Abort if browser does not support addEventListener
//    if (!doc.addEventListener) return;
//    win.addEventListener(resizeEvt, recalc, false);
//    doc.addEventListener('DOMContentLoaded', recalc, false);
//
//    // 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
//    (function(){
//        var dpr = scale =1;
//        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
//        var devicePixelRatio = win.devicePixelRatio;
//        if (isIPhone) {
//            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
//            if (devicePixelRatio >= 3 ) {
//                dpr = 3;
//            } else if (devicePixelRatio >= 2){
//                dpr = 2;
//            } else {
//                dpr = 1;
//            }
//        } else {
//            // 其他设备下，仍旧使用1倍的方案
//            dpr = 1;
//        }
//        scale = 1 / dpr;
//        //
//        var metaEl = "";
//        metaEl = doc.createElement('meta');
//        metaEl.setAttribute('name', 'viewport');
//        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
//        if (docEl.firstElementChild) {
//            docEl.firstElementChild.appendChild(metaEl);
//        } else {
//            var wrap = doc.createElement('div');
//            wrap.appendChild(metaEl);
//            doc.write(wrap.innerHTML);
//        }
//    })();
//})(document, window);


//(function(baseFontSize, fontscale) {
//    var _baseFontSize = baseFontSize || 100;
//    var _fontscale = fontscale || 1;
//    var win = window;
//    var doc = win.document;
//    var ua = navigator.userAgent;
//    var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
//    var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
//    var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
//    var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
//    var dpr = win.devicePixelRatio || 1;
//    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
//        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
//        dpr = 1;
//    }
//    var scale = 1 / dpr;
//
//    var metaEl = doc.querySelector('meta[name="viewport"]');
//    if (!metaEl) {
//        metaEl = doc.createElement('meta');
//        metaEl.setAttribute('name', 'viewport');
//        doc.head.appendChild(metaEl);
//    }
//    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
//    doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
//})();


(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var flexibleEl = doc.querySelector('meta[name="flexible"]');
    var dpr = 0;
    var scale = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});

    if (metaEl) {
        //console.warn('将根据已有的meta标签来设置缩放比例');
        var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (match) {
            scale = parseFloat(match[1]);
            dpr = parseInt(1 / scale);
        }
    } else if (flexibleEl) {
        var content = flexibleEl.getAttribute('content');
        if (content) {
            var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
            var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1]);
                scale = parseFloat((1 / dpr).toFixed(2));
            }
        }
    }

    if (!dpr && !scale) {
        var isAndroid = win.navigator.appVersion.match(/android/gi);
        var isIPhone = win.navigator.appVersion.match(/iphone/gi);
        var devicePixelRatio = win.devicePixelRatio;
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
    }

    docEl.setAttribute('data-dpr', dpr);
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl);
        } else {
            var wrap = doc.createElement('div');
            wrap.appendChild(metaEl);
            doc.write(wrap.innerHTML);
        }
    }

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        var rem = width / 750 * 100;   // 设计图 750
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 * dpr + 'px';
        }, false);
    }

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

})(window, window['lib'] || (window['lib'] = {}));

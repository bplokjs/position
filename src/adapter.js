

import offset from 'bplokjs-dom-utils/offset';
import css from 'bplokjs-dom-utils/css';

const NODE_TYPE_DOCUMENT = 9;

function isWindow(obj) {
    return obj != null && obj === obj.window;
}

function each(obj, callback) {
    let length, i = 0;

    if ('length' in obj) {
        length = obj.length;
        for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}

class Adapter {
    constructor(dom) {
        this._dom = dom;
        this[0] = dom;
        this.length = 1;
    }

    width(type = 'Width') {
        const elem = this._dom;

        if (isWindow(elem)) {
            // 不包含滚动条
            return elem.document.documentElement["client" + type];
        }

        if (elem.nodeType === NODE_TYPE_DOCUMENT) {
            const doc = elem.documentElement;

            return Math.max(
                elem.body["scroll" + type], doc["scroll" + type],
                elem.body["offset" + type], doc["offset" + type],
                doc["client" + type]
            );
        }

        return elem['offset' + type];
    }

    height() {
        return this.width('Height');
    }

    outerWidth() {
        return this.width();
    }

    outerHeight() {
        return this.height();
    }

    offset(coordinates) {
        const elem = this._dom;
        if (coordinates == null) {
            return offset(elem);
        }

        offset(elem, coordinates);

        return this;
    }

    scrollTop(prop = 'pageYOffset', method = 'scrollTop') {
        let win;
        const elem = this._dom;

        if (isWindow(elem)) {
            win = elem;
        } else if (elem.nodeType === NODE_TYPE_DOCUMENT) {
            win = elem.defaultView;
        }

        return win ? win[prop] : elem[method];
    }

    scrollLeft() {
        return this.scrollTop('pageXOffset', 'scrollLeft');
    }

    css(key) {
        return css(this._dom, key);
    }

    each(cb) {
        cb.call(this._dom);
    }
}

function AdapterCreator(dom) {
    return new Adapter(dom);
}

AdapterCreator.isWindow = isWindow;
AdapterCreator.css = css;
AdapterCreator.extend = Object.assign;
AdapterCreator.each = each;


export default AdapterCreator;
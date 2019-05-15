
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _offset2 = _interopRequireDefault(require("bplokjs-dom-utils/offset"));

var _css2 = _interopRequireDefault(require("bplokjs-dom-utils/css"));

var NODE_TYPE_DOCUMENT = 9;

function isWindow(obj) {
  return obj != null && obj === obj.window;
}

function each(obj, callback) {
  var length,
      i = 0;

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

var Adapter =
/*#__PURE__*/
function () {
  function Adapter(dom) {
    (0, _classCallCheck2.default)(this, Adapter);
    this._dom = dom;
    this[0] = dom;
    this.length = 1;
  }

  (0, _createClass2.default)(Adapter, [{
    key: "width",
    value: function width() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Width';
      var elem = this._dom;

      if (isWindow(elem)) {
        // 不包含滚动条
        return elem.document.documentElement["client" + type];
      }

      if (elem.nodeType === NODE_TYPE_DOCUMENT) {
        var doc = elem.documentElement;
        return Math.max(elem.body["scroll" + type], doc["scroll" + type], elem.body["offset" + type], doc["offset" + type], doc["client" + type]);
      }

      return elem['offset' + type];
    }
  }, {
    key: "height",
    value: function height() {
      return this.width('Height');
    }
  }, {
    key: "outerWidth",
    value: function outerWidth() {
      return this.width();
    }
  }, {
    key: "outerHeight",
    value: function outerHeight() {
      return this.height();
    }
  }, {
    key: "offset",
    value: function offset(coordinates) {
      var elem = this._dom;

      if (coordinates == null) {
        return (0, _offset2.default)(elem);
      }

      (0, _offset2.default)(elem, coordinates);
      return this;
    }
  }, {
    key: "scrollTop",
    value: function scrollTop() {
      var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'pageYOffset';
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'scrollTop';
      var win;
      var elem = this._dom;

      if (isWindow(elem)) {
        win = elem;
      } else if (elem.nodeType === NODE_TYPE_DOCUMENT) {
        win = elem.defaultView;
      }

      return win ? win[prop] : elem[method];
    }
  }, {
    key: "scrollLeft",
    value: function scrollLeft() {
      return this.scrollTop('pageXOffset', 'scrollLeft');
    }
  }, {
    key: "css",
    value: function css(key) {
      return (0, _css2.default)(this._dom, key);
    }
  }, {
    key: "each",
    value: function each(cb) {
      cb.call(this._dom);
    }
  }]);
  return Adapter;
}();

function AdapterCreator(dom) {
  return new Adapter(dom);
}

AdapterCreator.isWindow = isWindow;
AdapterCreator.css = _css2.default;
AdapterCreator.extend = _assign.default;
AdapterCreator.each = each;
var _default = AdapterCreator;
exports.default = _default;
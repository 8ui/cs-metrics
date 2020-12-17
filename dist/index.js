"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('detect-browser'),
    detect = _require.detect;

var Metrics = /*#__PURE__*/function () {
  function Metrics() {
    _classCallCheck(this, Metrics);

    this.url = 'https://metrics.cloudshop.ru/';
    this.config = {
      app: {
        platform: 'web',
        app: 'WAPP',
        version: '1.0',
        browser: null
      }
    };
  }

  _createClass(Metrics, [{
    key: "init",
    value: function init(props) {
      try {
        var config = {
          client_id: props.client_id,
          user_id: props.user_id
        };
        var app = Object.assign(this.config.app || {}, props.app);

        if (app.platform === 'web') {
          var browser = detect();
          app.browser = browser.name + ' ' + browser.version;
        }

        Object.assign(this.config, config, {
          app: app
        });
      } catch (e) {
        console.warn('METRICS ERROR', e);
      }
    }
  }, {
    key: "track",
    value: function track(event, payload) {
      return this.fetch(Object.assign({}, this.config, {
        payload: payload,
        event: event
      }));
    }
  }, {
    key: "fetch",
    value: function fetch(data) {
      var url = this.url;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function () {
          if (this.readyState !== 4) return;

          if (this.status > 204) {
            reject({
              status: false,
              code: this.status,
              text: this.statusText
            });
          } else {
            resolve({
              status: true,
              code: this.status
            });
          }
        };
      });
    }
  }]);

  return Metrics;
}();

var _default = Metrics;
exports["default"] = _default;
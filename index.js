const { detect } = require('detect-browser');

class Metrics {
  constructor() {
    this.url = 'https://metrics.cloudshop.ru/';

    this.config = {
      app: {
        platform: 'web',
        app: 'WAPP',
        version: '1.0',
        browser: null
      }
    }
  }

  init(props) {
    try {
      const config = {
        client_id: props.client_id,
        user_id: props.user_id,
      }

      const app = Object.assign((this.config.app || {}), props.app);

      if (app.platform === 'web') {
        const browser = detect();
        app.browser = browser.name + ' ' + browser.version;
      }

      Object.assign(this.config, config, { app: app });
    } catch (e) {
      console.warn('METRICS ERROR', e);
    }
  }

  track(event, payload) {
    return this.fetch(Object.assign({}, this.config, {payload: payload, event: event}))
  }

  fetch(data) {
    const url = this.url;
    return new Promise(function(resolve, reject) {
      const xhr = new XMLHttpRequest();

      xhr.open('POST', url, true);

      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.send(JSON.stringify(data));

      xhr.onreadystatechange = function() {
        if (this.readyState !== 4) return;

        if (this.status > 204) {
          reject({
            status: false,
            code: this.status,
            text: this.statusText
          })
        } else {
          resolve({
            status: true,
            code: this.status,
          })
        }
      }
    })
  }
}

export default Metrics;

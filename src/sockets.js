// From Robbies MX Robot app. I think he might have gotten it from somewhere else?

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ReconnectingWebSocket {
  static NORMAL_CLOSURE = 1000;

  constructor(urls, autoReconnectInterval = 3000) {
    this.urls = urls;
    this.autoReconnectInterval = autoReconnectInterval;
    this.instance = {};
    for (let [key, url] of Object.entries(this.urls)) {
      this._open(key, url);
    }
  }

  async send(key, ...args) {
    try {
      this.instance[key].send(...args);
    } catch {
      await sleep(3000);
      this.instance[key].send(...args);
    }
  }

  close = (key, ...args) => {
    this.instance[key].close(...args);
  };

  onopen = () => {};

  onmessage = () => {};

  onerror = () => {};

  onclose = () => {};

  _open = (key, url) => {
    this.instance[key] = new WebSocket(url);
    console.log("new websocket");
    this.instance[key].onopen = (...args) => {
      console.log("websocket open");
      console.log(key);
      this.onopen(key, ...args);
    };
    this.instance[key].onmessage = (...args) => {
      this.onmessage(...args);
    };
    this.instance[key].onclose = (event, ...args) => {
      if (event.code !== ReconnectingWebSocket.NORMAL_CLOSURE) {
        this._reconnect(key, url);
      }
      this.onclose(event, ...args);
    };
    this.instance[key].onerror = (...args) => {
      this.onerror(...args);
    };
  };

  _reconnect = (key, url) => {
    setTimeout(() => {
      this._open(key, url);
    }, this.autoReconnectInterval);
  };
}

const socket = new ReconnectingWebSocket(
  {
    vacuum: `ws://${window.location.hostname}:3144`,
    vacstatus: `ws://${window.location.hostname}:3145`
    status: `ws://${window.location.hostname}:3143`,
    acquire: `ws://${window.location.hostname}:3142`,
    ophyd: `ws://${window.location.hostname}:9999`
  }

  // {
  //   acquire: `ws://${window.location.hostname}:${process.env.ACQUIRE_WEBSOCKET}`,
  //   control: `ws://${window.location.hostname}:${process.env.CONTROL_WEBSOCKET}`
  // }
  // `wss://echo.websocket.org`
);

export default socket;

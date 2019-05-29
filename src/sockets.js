// From Robbies MX Robot app. I think he might have gotten it from somewhere else?

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

  send = (key, ...args) => {
    this.instance[key].send(...args);
  };

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
      this.onopen(...args);
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
    acquire: `ws://${window.location.hostname}:3142`,
    status: `ws://${window.location.hostname}:3001`
  }
  // {
  //   acquire: `ws://${window.location.hostname}:${process.env.ACQUIRE_WEBSOCKET}`,
  //   control: `ws://${window.location.hostname}:${process.env.CONTROL_WEBSOCKET}`
  // }
  // `wss://echo.websocket.org`
);

export default socket;

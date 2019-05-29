// From Robbies MX Robot app. I think he might have gotten it from somewhere else?

class ReconnectingWebSocket {
  static NORMAL_CLOSURE = 1000;

  constructor(url, autoReconnectInterval = 3000) {
    this.url = url;
    this.autoReconnectInterval = autoReconnectInterval;
    this._open();
  }

  send = (...args) => {
    this.instance.send(...args);
  };

  close = (...args) => {
    this.instance.close(...args);
  };

  onopen = () => {};

  onmessage = () => {};

  onerror = () => {};

  onclose = () => {};

  _open = () => {
    this.instance = new WebSocket(this.url);
    this.instance.onopen = (...args) => {
      this.onopen(...args);
    };
    this.instance.onmessage = (...args) => {
      this.onmessage(...args);
    };
    this.instance.onclose = (event, ...args) => {
      if (event.code !== ReconnectingWebSocket.NORMAL_CLOSURE) {
        this._reconnect();
      }
      this.onclose(event, ...args);
    };
    this.instance.onerror = (...args) => {
      this.onerror(...args);
    };
  };

  _reconnect = () => {
    setTimeout(() => {
      this._open();
    }, this.autoReconnectInterval);
  };
}

const socket = new ReconnectingWebSocket(
  `ws://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET}`
  // `wss://echo.websocket.org`
);

export default socket;

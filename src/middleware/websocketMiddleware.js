export const websocketMiddleware = endpoints => store => {
  const sockets = new ReconnectingWebSocket(endpoints.urls)

  sockets.onopen = websocket => {
    console.log("websocket " + websocket + " opened");
    try {
      store.dispatch(endpoints.onOpenDispatch[websocket]())
    } catch (err) { }
  };
  sockets.onclose = websocket => {
    console.log("websocket " + websocket + " closed");
    try {
      store.dispatch(endpoints.onCloseDispatch[websocket]())
    } catch (err) { }
  };
  sockets.onmessage = event => {
  
    var data = event.data;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    // Strip websocket key if it exists to prevent loops
    delete data.websocket 

    store.dispatch(data);
  };

  return next => action => {
    if (action.websocket) {
      sockets.send(action.websocket, JSON.stringify(action));
    } else {
      next(action);
    }
  }
}

class ReconnectingWebSocket {
  static NORMAL_CLOSURE = 1000;

  constructor(urls, autoReconnectInterval = 3000) {
    this.urls = urls;
    this.autoReconnectInterval = autoReconnectInterval;
    this.instance = {};
    this.buffer = {};
    for (let [key, url] of Object.entries(this.urls)) {
      this._open(key, url);
    }
  }

  async send(key, ...args) {
    try {
      this.instance[key].send(...args);
    } catch {
      this.buffer[key].push(args);
    }
  }

  close = (key, ...args) => {
    this.instance[key].close(...args);
  };

  onopen = () => { };

  onmessage = () => { };

  onerror = () => { };

  onclose = () => { };

  _open = (key, url) => {
    this.instance[key] = new WebSocket(url);
    this.buffer[key] = [];
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
      this.onclose(key, ...args);
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



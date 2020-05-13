export const websocketMiddleware = endPoints => store => {
  const sockets = new ReconnectingWebSocket(endPoints, store)

  return next => action => {
    if (action.websocketConnect) {
      sockets.addEndPoints(action.data.endPoints)
    } else if (action.websocket) {
      sockets.send(action.websocket, JSON.stringify(action));
    } else {
      next(action);
    }
  }
}

class ReconnectingWebSocket {
  static NORMAL_CLOSURE = 1000;

  constructor(endPoints, store, autoReconnectInterval = 3000) {
    this.store = store;
    this.autoReconnectInterval = autoReconnectInterval;
    this.endPoints = {};
    this.instance = {};
    this.keyLookup = {};
    this.buffer = {};
    this.addEndPoints(endPoints)
  }

  addEndPoints = (endPoints) => {
    for (let [key, url] of Object.entries(endPoints.urls)) {
      try { this._open(key,url); } catch { continue }
      this.endPoints[key] = {
        url: endPoints.urls[key],
        onOpenDispatch: endPoints.onOpenDispatch[key] || null,
        onCloseDispatch: endPoints.onCloseDispatch[key] || null
      };
    }
  }

  _open = (key, url) => {
    const websocket = new WebSocket(url);
    this.instance[key] = websocket;
    this.keyLookup[websocket] = key;
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

  onopen = websocket => {
    console.log("websocket " + websocket + " opened");

    try {
      let onOpenDispatch = this.endPoints[this.keyLookup[websocket]].onOpenDispatch
      this.store.dispatch(onOpenDispatch[websocket]())
    } catch (err) { }
  };
  onclose = websocket => {
    console.log("websocket " + websocket + " closed");
    try {
      let onCloseDispatch = this.endPoints[this.keyLookup[websocket]].onCloseDispatch
      this.store.dispatch(onCloseDispatch[websocket]())
    } catch (err) { }
  };
  onmessage = event => {

    var data = event.data;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    // Strip websocket key if it exists to prevent loops
    delete data.websocket

    console.log("dispatching data" + data);
    this.store.dispatch(data);
  };

  onerror = () => { };


}



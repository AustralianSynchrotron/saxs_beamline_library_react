import { Provider } from "react-redux";
import socket from "./sockets";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore from "./configureStore";
import { handleDataFromServer, getServerVersion } from "./actions";
import * as serviceWorker from "./serviceWorker";
require("typeface-roboto");

const store = configureStore(socket);

socket.onopen = () => {
  console.log("websocket opened");
  store.dispatch(getServerVersion());
};
socket.onclose = () => {
  console.log("closed");
};
socket.onmessage = event => {
  store.dispatch(handleDataFromServer(event.data));
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

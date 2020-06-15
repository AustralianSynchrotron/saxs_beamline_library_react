import { createStore, applyMiddleware, compose } from "redux";
import { alarmMiddleware } from "./middleware/alarmMiddleware";
import { fetchMiddleware } from "./middleware/fetchMiddleware";
import { websocketMiddleware } from "./middleware/websocketMiddleware";
import rootReducer from "./reducers/";
import { listenStatus, ophydConnected } from "./actions";

const baseURL = "localhost";

const endpoints = {
  urls: {
    vacuum: `ws://${baseURL}:3144`,
    vacstatus: `ws://${baseURL}:3145`,
    status: `ws://dockervip:3143`,
    cameraLength: `ws://dockervip:4004/api/v1.0/ws`,
    flags: `ws://dockervip:4005/api/v1.0/ws`,
    redis: `ws://dockervip:4006/api/v1.0/ws`,
    energy: `ws://dockervip:4007/api/v1.0/ws`,
    // acquire: `ws://${baseURL}:3142`,
    // // ophyd: `ws://${baseURL}:9999`,
    // docker: `ws://${baseURL}:9991`,
    // logger: `ws://${baseURL}:3001`,
    // grazing: `ws://${baseURL}:3002`
  },
  onOpenDispatch: {
    status: listenStatus,
    ophyd: () => (ophydConnected(true))
  },
  onCloseDispatch: {
    ophyd: () => (ophydConnected(false))
  }
}

export default () => {
  const middlewares = [];

  middlewares.push(websocketMiddleware(endpoints));
  middlewares.push(fetchMiddleware);
  middlewares.push(alarmMiddleware);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

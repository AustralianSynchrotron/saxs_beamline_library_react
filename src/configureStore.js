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
    status: `ws://${baseURL}:3143`,
    // acquire: `ws://${baseURL}:3142`,
    // // ophyd: `ws://${baseURL}:9999`,
    // docker: `ws://${baseURL}:9991`,
    // logger: `ws://${baseURL}:3001`,
    // grazing: `ws://${baseURL}:3002`
    cameraLength: `ws://${baseURL}:8082/api/v1.0/ws`
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

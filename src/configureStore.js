import { createStore, applyMiddleware, compose } from "redux";
import { alarmMiddleware } from "./alarmMiddleware";
import rootReducer from "./reducers/";

const forwardToServer = socket => store => next => action => {
  if (!action.local && !action.fromServer) {
    socket.send(action.key, JSON.stringify(action));
  }
  next(action);
};

const dropUnlessFromServer = store => next => action => {
  if (action.local || action.fromServer) {
    next(action);
  }
};

export default socket => {
  const middlewares = [];
  if (socket !== undefined) {
    middlewares.push(forwardToServer(socket));
    middlewares.push(dropUnlessFromServer);
    middlewares.push(alarmMiddleware);
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

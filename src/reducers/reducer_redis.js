import * as actions from "../actions/actionTypes";

const default_state = {
  kvs: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.GETKVS:
      return { ...state, kvs: { ...state.kvs, ...action.data } };
    case actions.REDISUPDATE:
      return { ...state, kvs: { ...state.kvs, ...action.data } };
    default:
      return state;
  }
};

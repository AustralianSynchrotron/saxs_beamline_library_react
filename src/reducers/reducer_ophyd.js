import * as actions from "../actions/actionTypes";

const default_state = {
  devices: {},
  bundles: {},
  setError: null,
  connected: false
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.OPHYDCONNECTED:
      return {
        ...state,
        connected: action.data.connected
      };
    case actions.CLEARSETERROR:
      return {
        ...state,
        setError: null
      };
    case actions.SETDEVICE:
      var errorMessage = null;
      if (!action.data.set_success) {
        errorMessage = action.data.set_message;
      }
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.data.device]: { ...state.devices[action.data.device], ...action.data }
        },
        setError: errorMessage
      };
    case actions.SUBSCRIBEDEVICE:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.data.device]: { ...state.devices[action.data.device], ...action.data }
        }
      };
    case actions.GETBUNDLELIST:
      return {
        ...state,
        bundles: {
          ...state.bundles,
          [action.data.bundle]: { name: action.data.name, list: action.data.list }
        }
      };
    case actions.LIBRARYUPDATE:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.data.device]: { ...state.devices[action.data.device], value: action.data.value }
        }
      };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";

const default_state = {
  devices: {},
  bundles: {}
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.SETDEVICE:
      return {
        ...state,
        devices: {
          ...state.devices,
          [action.data.device]: { ...state.devices[action.data.device], ...action.data }
        }
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
      console.log(actions.LIBRARYUPDATE);
      console.log(action.data.device);
      console.log(action.data.value);
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

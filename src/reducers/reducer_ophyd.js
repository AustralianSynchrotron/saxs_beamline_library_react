import * as actions from "../actions/actionTypes";

const default_state = {
  devices: {},
  bundles: {}
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.SUBSCRIBEDEVICE:
      console.log(state);
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

import * as actions from "../actions/actionTypes";

const default_state = {
  config_list: [],
  config: { name: "", description: "", devices: {} }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LISTCONFIGS:
      return { ...state, config_list: action.data };
    case actions.GETCONFIG:
      return { ...state, config: action.data };
    case actions.DEFAULTCONFIG:
      return { ...state, config: action.data };
    case actions.CONFIGSETPARAM:
      return { ...state, config: action.data };
    case actions.ADDDEVICE:
      return { ...state, config: action.data };
    case actions.DELETEDEVICE:
      return { ...state, config: action.data };
    case actions.NEWCONFIG:
      return { ...state, config_list: action.data.config_list, config: action.data.config };
    default:
      return state;
  }
};

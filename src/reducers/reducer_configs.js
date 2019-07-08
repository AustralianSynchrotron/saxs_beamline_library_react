import * as actions from "../actions/actionTypes";

const default_state = {
  config_list: ["default"],
  config: { name: "", description: "", devices: {} }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LISTCONFIGS:
      return { ...state, config_list: action.data.concat("default") };
    case actions.GETCONFIG:
      return { ...state, config: action.data };
    default:
      return state;
  }
};

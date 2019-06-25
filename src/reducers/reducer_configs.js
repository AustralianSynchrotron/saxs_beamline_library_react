import * as actions from "../actions/actionTypes";

const default_state = {
  config_list: ["default"]
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LIST_CONFIGS:
      return { ...state, config_list: action.data };
    default:
      return state;
  }
};

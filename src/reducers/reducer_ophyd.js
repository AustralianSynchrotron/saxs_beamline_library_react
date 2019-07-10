import * as actions from "../actions/actionTypes";

const default_state = {
  devices: {}
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LIBRARYUPDATE:
      return { ...state, devices: { ...state.devices, [action.data.device]: action.data.value } };
    default:
      return state;
  }
};

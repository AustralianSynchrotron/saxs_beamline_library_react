import * as actions from "../actions/actionTypes";

const default_state = {
  devices: {}
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LIBRARYUPDATE:

      return { ...state, device };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";

const default_state = {
  flags: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.GETFLAGS:
      return { ...state, flags: { ...state.flags, ...action.data } };
    case actions.FLAGSUPDATE:
      return { ...state, flags: { ...state.flags, ...action.data } };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";

const default_state = {
  epns: {},
  plates: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.GETMAILINEPNS:
      return { ...state, epns: { ...state.epns, ...action.data } };
    case actions.GETMAILINPLATES:
      return { ...state, plates: { ...state.plates, ...action.data } };
    default:
      return state;
  }
};

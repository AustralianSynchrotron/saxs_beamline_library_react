import * as actions from "../actions/actionTypes";

const default_state = {
  message: " lkhj",
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.DOFEEDBACK:
      return { ...state, message: action.data.message };
    case actions.STOPFEEDBACK:
      return { ...state, message: action.data.message };
    default:
      return state;
  }
};

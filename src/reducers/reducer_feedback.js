import * as actions from "../actions/actionTypes";

const default_state = {
  message: " ",
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.DOFEEDBACK:
      return { ...state, message: action.data.message };
    case actions.STOPFEEDBACK:
      return { ...state, message: action.data.message };
    case actions.CLEARFEEDBACKLOG:
      return { ...state, message: " "}
    default:
      return state;
  }
};

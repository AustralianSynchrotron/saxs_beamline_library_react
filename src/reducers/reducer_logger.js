import * as actions from "../actions/actionTypes";

const default_state = {
  logData: []
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LISTENLOGGER:
      return { ...state, logData: action.data.messages };
    case actions.LOGGERUPDATE:
      var lines = state.logData;
      if (lines.length > 500) {
        lines.pop();
      }
      return { ...state, logData: [action.data, ...lines] };
    default:
      return state;
  }
};

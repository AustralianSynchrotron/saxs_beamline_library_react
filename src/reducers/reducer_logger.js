import * as actions from "../actions/actionTypes";

const default_state = {
  logData: []
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LISTENLOGGER:
      console.log(action.data.messages);
      return { ...state, logData: action.data.messages };
    case actions.LOGGERUPDATE:
      console.log(state.logData)
      var lines = state.logData;
      if (lines.length > 50) {
        lines.pop();
      }
      return { ...state, logData: [action.data, ...lines] };
    default:
      return state;
  }
};

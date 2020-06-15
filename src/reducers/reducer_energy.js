import * as actions from "../actions/actionTypes";

const default_state = {
  progressLog: "",
  data: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.CLEARPROGRESSLOG:
      return {...state, progressLog: ""}
    case actions.ENERGYCHANGE:
      return {...state, progressLog: ""}
    case actions.ENERGYCHANGEUPDATE:
      try {
        var data = action.data.data.data;
      } catch {
        data = {}
      }
      return {
        ...state,
        progressLog: action.data.message + "\n" + state.progressLog,
        data: { ...state.data, ...data },
      };
    default:
      return state;
  }
};

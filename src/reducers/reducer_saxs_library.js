import * as actions from "../actions/actionTypes";

const default_state = {
  positioners: [{ device: "blah1", name: "Sample Table X" }, { device: "blah2", name: "Sample Table Y" }]
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.POSITIONERS:
      return { ...state, positioners: action.data };
    default:
      return state;
  }
};

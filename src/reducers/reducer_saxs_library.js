import * as actions from "../actions/actionTypes";

const default_state = {
  positioners: [
    { device: "blah1", name: "Sample Table X" },
    { device: "blah2", name: "Sample Table Y" },
    { device: "blah3", name: "Filename" }
  ],
  positionersLookup: {}
};

export default (state = default_state, action) => {
  let lookup = {};
  switch (action.type) {
    case actions.POSITIONERS:
      action.data.forEach(element => {
        lookup[element.name] = element.device;
      });
      return { ...state, positioners: action.data, positionersLookup: lookup };
    default:
      state.positioners.forEach(element => {
        lookup[element.name] = element.device;
      });
      return { ...state, positionersLookup: lookup };
  }
};

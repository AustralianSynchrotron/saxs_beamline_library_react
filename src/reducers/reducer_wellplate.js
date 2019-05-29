import * as actions from "../actions/actionTypes";

var wells = {};
for (var i = 0; i < 96; i++) {
  wells[i] = { name: "Well: " + i.toString(), wellType: "Sample", washType: "No Wash" };
}

const default_state = {
  wells
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.UPDATEWELL:
      return {
        ...state,
        wells: {
          ...state.wells,
          [action.data.index]: { ...state.wells[action.data.index], ...action.data.well }
        }
      };
    default:
      return state;
  }
};

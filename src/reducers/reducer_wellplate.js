import * as actions from "../actions/actionTypes";

var wells = {};
for (var i = 0; i < 96; i++) {
  wells[i] = { name: "Well: " + i.toString(), wellType: "Empty", washType: "No Wash" };
}
const plate_list = [];
const plate_name = "plate";

const default_state = {
  plate_name,
  wells,
  plate_list
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LISTPLATES:
      return {
        ...state,
        plate_list: action.data.plate_list
      };
    case actions.LOADPLATE:
      return {
        ...state,
        plate_name: action.data.plate_name,
        wells:
      };
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

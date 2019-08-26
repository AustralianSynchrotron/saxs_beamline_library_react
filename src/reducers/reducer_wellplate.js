import * as actions from "../actions/actionTypes";

var wells = {};
for (var i = 0; i < 960; i++) {
  wells[i] = {
    well_name: "Well: " + i.toString(),
    well_type: "Empty",
    wash_type: "No Wash",
    well_volume: 100,
    well_selected: true
  };
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
    // case actions.LOADPLATE:
    //   return {
    //     ...state,
    //     plate_name: action.data.plate_name,
    //     wells:
    //   };
    case actions.UPDATEWELL:
      return {
        ...state,
        wells: {
          ...state.wells,
          [action.data.index]: { ...state.wells[action.data.index], ...action.data.well }
        }
      };
    case actions.SELECTALLWELLS:
      console.log("here1");
      var wells = { ...state.wells };
      for (var well in state.wells) {
        wells[well]["selected"] = true;
      }
      return {
        ...state,
        wells: { ...wells }
      };
    case actions.UNSELECTALLWELLS:
      console.log("here2");
      var wells = { ...state.wells };
      for (var well in state.wells) {
        wells[well]["selected"] = false;
      }
      return {
        ...state,
        wells: { ...wells }
      };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";

const default_state = {
  force: 0,
  volts: 0,
  csa: 1,
  strain: 0,
  stress:0,
  extension: 0,
  tensilestatus: "Idle..."
};

export default (state = default_state, action) => {
    switch (action.type) {
      case actions.TENSVOLTS:
            return { ...state, volts:parseFloat(action.data.volts)};
      case actions.TENSFORCE:
            return { ...state, force:parseFloat(action.data.force)};
      case actions.TENSSTRESS:
            return { ...state, stress:parseFloat(action.data.stress)};
      case actions.TENSSTRAIN:
            return { ...state, strain:parseFloat(action.data.strain)};
      case actions.TENSEXTNION:
            return { ...state, extension:parseFloat(action.data.extension)};
      case actions.TENSCSA:
            return { ...state, csa:parseFloat(action.data.csa)};
      case actions.TENSSTATUS:
            return { ...state, tensilestatus:action.data.status};
      default:
            return state;
    }
};
      

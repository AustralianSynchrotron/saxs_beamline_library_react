import * as actions from "../actions/actionTypes";

const default_state = {
  devices: { "saxs_motors.in_vac.x": 100, "saxs_IO.rio0.ao_0": 0 }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.LIBRARYUPDATE:
      return { ...state, devices: { ...state.devices, [action.data.device]: action.data.value } };
    default:
      return state;
  }
};

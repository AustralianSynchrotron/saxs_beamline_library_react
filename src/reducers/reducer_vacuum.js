import * as actions from "../actions/actionTypes";

var pressures = {
  nosecone: 99999,
  chamber: 99999,
  beamline: 99999,
  vessel: 99999
};

const vac_Status = {
  nosecone: "Not Connected",
  chamber: "Not Connected",
  beamline: "Not Connected",
  vessel: "Not Connected"
};

const valves_status = {
  vlv07: "Closed",
  vlv10: "Closed",
  vlv11: "Closed",
  vlv12: "Closed",
  igv06: "Closed",
  igv08: "Closed",
  igv09: "Closed"
};

const pumps_status = {
  ebarra: "NotRunning",
  turbo1: "NotRunning",
  turbo2: "NotRunning",
  backing1: "NotRunning",
  backing2: "NotRunning"
};

const initial_state = {
  vac_Status,
  pressures,
  valves_status,
  pumps_status
};

export default (state = initial_state, action) => {
  var key;
  if ([actions.PRESSURES, actions.VALVES, actions.PUMPS, actions.VACSTATUS].indexOf(action.type) >= 0 ) {
    key = Object.keys(action.data);
  }
  switch (action.type) {
    case actions.PRESSURES:
      return { ...state, pressures: { ...state.pressures, [key]: action.data[key] } };
    case actions.VALVES:
      return { ...state, valves_status: { ...state.valves_status, [key]: action.data[key] } };
    case actions.PUMPS:
      return { ...state, pumps_status: { ...state.pumps_status, [key]: action.data[key] } };
    case actions.VACSTATUS:
      return { ...state, vac_Status: { ...state.vac_Status, [key]: action.data[key] } };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";
import { object } from "prop-types";

var pressures ={
    nosecone: 900,
    chamber: 899,
    beamline: 898,
    vessel: 897
  };


const vac_Status ={
    nosecone: 'Vented',
    chamber: 'Vented',
    beamline: 'Vented',
    vessel: 'Vented'
  };

const valves_status = {
  vlv07: 'Closed',
  vlv10: 'Closed',
  vlv11: 'Closed',
  vlv12: 'Closed',
  igv06: 'Closed',
  igv08: 'Closed',
  igv09: 'Closed'
};

const pumps_status ={
  ebarra: 'NotRunning',
  turbo1: 'NotRunning',
  turbo2: 'NotRunning',
  backing1: 'NotRunning',
  backing2: 'NotRunning'
};


const initial_state = {
  vac_Status,
  pressures,
  valves_status,
  pumps_status
};

export default(state = initial_state, action) => {
  switch(action.type) {
    case actions.PRESSURES:
        var key = Object.keys(action.data)
        return {...state, pressures: {...state.pressures, [key]:action.data[key]}}
    case actions.VALVES:
      var key = Object.keys(action.data)
      return {...state, valves_status: {...state.valves_status, [key]:action.data[key]}}
    case actions.PUMPS:
      var key = Object.keys(action.data)
      return {...state, pumps_status: {...state.pumps_status, [key]:action.data[key]}}
    case actions.VACSTATUS:
        var key = Object.keys(action.data)
        return {...state, vac_Status: {...state.vac_Status, [key]:action.data[key]}}
    default:
      return state;
  }
}




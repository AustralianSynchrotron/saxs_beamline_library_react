import * as actions from "../actions/actionTypes";

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
  ebarra: 'Stopped',
  turbo1: 'Stopped',
  turbo2: 'Stopped',
  backing1: 'Stopped',
  backing2: 'Stopped'
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
      return state;
    case actions.VACSTATUS:
      return state;
    case actions.VALVES:
      return state;
    case actions.PUMPS:
      return state;
    default:
      return state;
  }
}




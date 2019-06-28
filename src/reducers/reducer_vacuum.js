import * as actions from "../actions/actionTypes";

var pressures ={
    nosecone: 900,
    chamber: 900,
    beamline: 900,
    vessel: 900
  };


const vac_Status ={
    nosecone: 'Vented',
    chamber: 'Vented',
    beamline: 'Vented',
    vessel: 'Vented'
  };


const initial_state = {
  vac_Status,
  pressures
};

export default(state = initial_state, action) => {
  console.log("something is trying")
  console.log(action.type)
  switch(action.type) {
    case actions.PRESSURES:
      return initial_state;

    case actions.VACSTATUS:
      return initial_state;
    default:
      console.log("well this might mean something?")
      console.log(action.type, initial_state)
      return initial_state;
  }
}




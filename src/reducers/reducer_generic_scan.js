import * as actions from "../actions/actionTypes";

const default_state = {
  scan: {
    loops: [
      {
        numPositions: 3,
        delay: 10,
        positioners: {
          0: {
            positioner: "Sample Table X",
            mode: "Linear",
            absRel: "Absolute",
            start: 0.0,
            end: 10,
            positions: [1, 2, 3]
          }
        }
      }
    ]
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.UPDATE_GS_POSITIONER:
      return {
        ...state,
        scan: {
          ...state.scan,
          loops: {
            ...state.scan.loops,
            [action.data.loopNum]: {
              ...state.scan.loops[action.data.loopNum],
              positioners: {
                ...state.scan.loops[action.data.loopNum].positioners,
                [action.data.posNum]: {
                  ...state.scan.loops[action.data.loopNum].positioners[action.data.posNum],
                  [action.data.param]: action.data.value
                }
              }
            }
          }
        }
      };
    case actions.ADD_GS_POSITIONER:
      const number = Object.keys(state.scan.loops[action.data.loopNum].positioners).length - 1;
      return {
        ...state,
        scan: {
          ...state.scan,
          loops: {
            ...state.scan.loops,
            [action.data.loopNum]: {
              ...state.scan.loops[action.data.loopNum],
              positioners: {
                ...state.scan.loops[action.data.loopNum].positioners,
                [number + 1]: state.scan.loops[action.data.loopNum].positioners[number]
              }
            }
          }
        }
      };
    default:
      return state;
  }
};

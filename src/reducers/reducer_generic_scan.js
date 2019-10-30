import * as actions from "../actions/actionTypes";

const default_state = {
  scan_list: ["blah", "blah2"],
  scan: {
    numLoops: 1,
    loops: {
      0: {
        numPositioners: 1,
        numPositions: 3,
        delay: 10,
        positioners: {
          0: {
            name: "Sample Table X",
            positioner: "blah",
            mode: "Linear",
            absRel: "Absolute",
            start: 0.0,
            end: 10,
            positions: [1, 2, 3]
          }
        }
      }
    }
  }
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.ADD_GS_LOOP:
      return {
        ...state,
        scan: {
          ...state.scan,
          numLoops: state.scan.numLoops + 1,
          loops: {
            ...state.scan.loops,
            [state.scan.numLoops]: state.scan.loops[state.scan.numLoops - 1]
          }
        }
      };
    case actions.REMOVE_GS_LOOP:
      let loops = { ...state.scan.loops };
      delete loops[action.data.loopNum];
      let renamedLoops = Object.keys(loops).reduce(
        (acc, key) => ({
          ...acc,
          ...{ [key < action.data.loopNum ? key : key - 1]: loops[key] }
        }),
        {}
      );
      return {
        ...state,
        scan: {
          ...state.scan,
          numLoops: state.scan.numLoops - 1,
          loops: renamedLoops
        }
      };
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
      const numPositioners = state.scan.loops[action.data.loopNum].numPositioners;
      return {
        ...state,
        scan: {
          ...state.scan,
          loops: {
            ...state.scan.loops,
            [action.data.loopNum]: {
              ...state.scan.loops[action.data.loopNum],
              numPositioners: numPositioners + 1,
              positioners: {
                ...state.scan.loops[action.data.loopNum].positioners,
                [numPositioners]:
                  state.scan.loops[action.data.loopNum].positioners[numPositioners - 1]
              }
            }
          }
        }
      };
    case actions.REMOVE_GS_POSITIONER:
      let positioners = { ...state.scan.loops[action.data.loopNum].positioners };
      delete positioners[action.data.posNum];
      let renamedPositioners = Object.keys(positioners).reduce(
        (acc, key) => ({
          ...acc,
          ...{ [key < action.data.posNum ? key : key - 1]: positioners[key] }
        }),
        {}
      );
      return {
        ...state,
        scan: {
          ...state.scan,
          loops: {
            ...state.scan.loops,
            [action.data.loopNum]: {
              ...state.scan.loops[action.data.loopNum],
              numPositioners: state.scan.loops[action.data.loopNum].numPositioners - 1,
              positioners: renamedPositioners
            }
          }
        }
      };
    case actions.LOAD_GS_SCAN:
      return { ...state, scan: action.data.scan };
    case actions.LIST_GS_SCAN:
      return { ...state, scan_list: action.data };
    default:
      return state;
  }
};

import * as actions from "../actions/actionTypes";

const default_state = {
  omegaScans: [
    { x0: 1, y0: 10 },
    { x0: 2, y0: 20 },
    { x0: 3, y0: 30 },
    { x1: 3, y1: 10 },
    { x1: 4, y1: 20 },
    { x1: 5, y1: 30 },
    { x2: 6, y2: 10 },
    { x2: 7, y2: 20 },
    { x2: 8, y2: 30 }],
  heightScans: [
    { x0: 1, y0: 10 },
    { x0: 2, y0: 20 },
    { x0: 3, y0: 30 },
    { x1: 3, y1: 10 },
    { x1: 4, y1: 20 },
    { x1: 5, y1: 30 },
    { x2: 6, y2: 10 },
    { x2: 7, y2: 20 },
    { x2: 8, y2: 30 }]
  };

export default (state = default_state, action) => {
    switch (action.type) {
        case actions.HEIGHTSCAN:
          return { ...state, heightScans: action.data };
        case actions.OMEGASCAN:
          return { ...state, omegaScans: action.data };
        default:
            return state;
    }
};

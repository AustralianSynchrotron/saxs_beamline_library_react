import * as actions from "../actions/actionTypes";

const default_state = {
  cameraLength: 0,
  noseCones: {},
  noseCone: { name: "none", length: 0 },
  userOffset: 0.,
  progressLog: " ",
  data: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.CAMERALENGTH:
      return {...state, progressLog: " ", cameraLength: action.data}
    case actions.NOSECONES:
      return { ...state, noseCones: action.data };
    case actions.NOSECONE:
      return { ...state, noseCone: action.data };
    case actions.USEROFFSET:
      return { ...state, userOffset: action.data.user_offset };
    case actions.CLEARPROGRESSLOG:
        return {...state, progressLog: " "}
    case actions.CAMERALENGTHUPDATE:
      try {
        var data = action.data.data.data;
      } catch {
        data = {}
      }
      return {
        ...state,
        progressLog: action.data.message + "\n" + state.progressLog,
        data: { ...state.data, ...data },
      };
    default:
      return state;
  }
};

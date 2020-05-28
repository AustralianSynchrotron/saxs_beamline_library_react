import * as actions from "../actions/actionTypes";

const default_state = {
  noseCones: {},
  noseCone: { name: "none", length: 0 },
  progressMessage: "",
  data: {},
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.NOSECONES:
      return { ...state, noseCones: action.data };
    case actions.NOSECONE:
      return { ...state, noseCone: action.data };
    case actions.CAMERALENGTHUPDATE:

      try {
        var data = action.data.data.data;
      } catch {
        data = {}
      }

      return {
        ...state,
        progressMessage: state.progressMesssage + action.data.message + "\n",
        data: { ...state.data, ...data },
      };
    default:
      return state;
  }
};

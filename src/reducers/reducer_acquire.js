import * as actions from "../actions/actionTypes";
import version from "../version";

const default_state = {
  server_version: null,
  client_version: version,
  status: "Idle..."
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.SERVERVERSION:
      return { ...state, server_version: action.data };
    case actions.STATUS:
      return { ...state, status: action.data.status };
    default:
      return state;
  }
};

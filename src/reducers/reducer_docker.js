import * as actions from "../actions/actionTypes";

const default_state = {
  services: [
    { name: "test", status: "Running" },
    { name: "areallyreallyreallyreallyreallyreallylongnamereally", status: "Running" }
  ]
};

export default (state = default_state, action) => {
  switch (action.type) {
    case actions.SUBSCRIBEDOCKER:
      return {
        ...state,
        services: {
          ...action.data.services
        }
      };
    default:
      return state;
  }
};

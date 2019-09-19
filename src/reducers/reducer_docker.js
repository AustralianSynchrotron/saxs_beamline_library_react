import * as actions from "../actions/actionTypes";

const default_state = {
  services: [
    {
      name: "test",
      tasks: "0",
      replicas: "2",
      node: "docker1",
      image: "image1"
    },
    {
      name: "a_test",
      tasks: "1",
      replicas: "1",
      node: "docker1",
      image: "image1"
    },
    {
      name: "c_test",
      tasks: "0",
      replicas: "0",
      node: "docker0",
      image: "image1"
    },
    {
      name: "c_test",
      tasks: "2",
      replicas: "1",
      node: "docker1",
      image: "image1"
    },
    {
      name: "x_test",
      tasks: "2",
      replicas: "5",
      node: "docker2",
      image: "image1"
    },
    {
      name: "k_test",
      tasks: "0",
      replicas: "3",
      node: "docker2",
      image: "image1"
    },
    {
      name: "l_test",
      tasks: "2",
      replicas: "2",
      node: "docker1",
      image: "image1"
    },
    {
      name: "s_test",
      tasks: "1",
      replicas: "1",
      node: "docker1",
      image: "image1"
    }
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

import { chime as chimeSound } from "../media/sounds";
import { CHIME } from "../actions/actionTypes";

export const alarmMiddleware = store => {

  return next => action => {
    switch (action.type) {
      case CHIME:
        if (action.data.status.split(" ")[0] === "Finished") {
          chimeSound.play();
        }
        break;

      default:
        break;
    }
    next(action);
  };
};

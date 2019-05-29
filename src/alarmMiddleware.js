import alarmwav from "./media/Alarm07.wav";
import { ALARM } from "./actions/actionTypes";

export const alarmMiddleware = store => {
  const alarm = new Audio(alarmwav);

  return next => action => {
    switch (action.type) {
      case ALARM:
        if (action.data.status.split(" ")[0] === "Finished") {
          alarm.play();
        }
        break;
      default:
        break;
    }
    next(action);
  };
};

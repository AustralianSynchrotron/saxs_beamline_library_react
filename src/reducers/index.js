import { combineReducers } from "redux";
import AcquireReducer from "./reducer_acquire";
import WellPlateReducer from "./reducer_wellplate";

const rootReducer = combineReducers({
  acquire: AcquireReducer,
  wellPlate: WellPlateReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import AcquireReducer from "./reducer_acquire";
import WellPlateReducer from "./reducer_wellplate";
import ConfigsReducer from "./reducer_configs";

const rootReducer = combineReducers({
  acquire: AcquireReducer,
  wellPlate: WellPlateReducer,
  configs: ConfigsReducer
});

export default rootReducer;

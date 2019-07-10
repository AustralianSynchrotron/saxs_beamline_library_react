import { combineReducers } from "redux";
import AcquireReducer from "./reducer_acquire";
import WellPlateReducer from "./reducer_wellplate";
import ConfigsReducer from "./reducer_configs";
import OphydReducer from "./reducer_ophyd";
import VacuumReducer from "./reducer_vacuum";

const rootReducer = combineReducers({
  acquire: AcquireReducer,
  wellPlate: WellPlateReducer,
  configs: ConfigsReducer,
  ophyd: OphydReducer,
  vacuum: VacuumReducer
});

export default rootReducer;

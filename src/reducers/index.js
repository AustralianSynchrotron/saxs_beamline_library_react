import { combineReducers } from "redux";
import AcquireReducer from "./reducer_acquire";
import WellPlateReducer from "./reducer_wellplate";
import ConfigsReducer from "./reducer_configs";
import OphydReducer from "./reducer_ophyd";
import VacuumReducer from "./reducer_vacuum";
import TensileReducer from "./reducer_tensile";
import DockerReducer from "./reducer_docker";
import LoggerReducer from "./reducer_logger";
import LibraryReducer from "./reducer_saxs_library";
import GrazingReducer from "./reducer_grazing";

const rootReducer = combineReducers({
  acquire: AcquireReducer,
  wellPlate: WellPlateReducer,
  configs: ConfigsReducer,
  ophyd: OphydReducer,
  vacuum: VacuumReducer,
  tensile: TensileReducer,
  docker: DockerReducer,
  logger: LoggerReducer,
  library: LibraryReducer,
  grazing: GrazingReducer
});

export default rootReducer;

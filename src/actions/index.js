import { bindActionCreators } from "redux";
import * as actions from "./actionTypes";

export const handleDataFromServer = raw_data => {
  var data = {};
  if (typeof raw_data === "string") {
    data = JSON.parse(raw_data);
  }
  data.fromServer = true;
  return data;
};
export const getServerVersion = () => ({
  type: actions.SERVERVERSION,
  key: "acquire"
});
export const acquire = (filename, exp_times, num_images, delay, description) => ({
  type: actions.ACQUIRE,
  data: { filename, exp_times, num_images, delay, description },
  key: "acquire"
});
export const pause = () => ({
  type: actions.PAUSE,
  key: "acquire"
});
export const resume = () => ({
  type: actions.RESUME,
  key: "acquire"
});
export const stop = () => ({
  type: actions.STOP,
  key: "acquire"
});
export const halt = () => ({
  type: actions.HALT,
  key: "acquire"
});
export const updateWell = (index, well) => ({
  type: actions.UPDATEWELL,
  data: { index, well },
  local: true
});
export const selectAllWells = () => ({
  type: actions.SELECTALLWELLS,
  local: true
});
export const unselectAllWells = () => ({
  type: actions.UNSELECTALLWELLS,
  local: true
});
export const savePlate = (plate_name, sample_names, positions, washes, types) => ({
  type: actions.SAVEPLATE,
  data: { plate_name, sample_names, positions, washes, types }
});
export const loadPlate = plate_name => ({
  type: actions.LOADPLATE,
  data: { plate_name }
});
export const listPlates = () => ({
  type: actions.LISTPLATES
});
export const runPlate = (plate_name, sample_names, positions, washes, types) => ({
  type: actions.RUNPLATE,
  data: { plate_name, sample_names, positions, washes, types }
});
export const updateStatus = status => ({
  type: actions.STATUS,
  data: { status },
  fromServer: true
});

export const listenStatus = () => ({
  type: actions.LISTENSTATUS,
  key: "status"
});

export const listenVacStatus = () => ({
  type: actions.LISTENVACSTATUS,
  key: "vacuum"
});

export const updateVacStatus = (nosecone, chamber, beamline, vessel) => ({
  type: actions.VACSTATUS,
  data: { nosecone, chamber, beamline, vessel },
  local: true
});

export const listenPressures = () => ({
  type: actions.LISTENPRESSURES,
  key: "vacuum"
});

export const updatePressures = (nosecone, beamline, chamber, vessel) => ({
  type: actions.PRESSURES,
  data: { nosecone, beamline, chamber, vessel },
  local: true
});

export const updateValves = (vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09) => ({
  type: actions.VALVES,
  data: { vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09 },
  local: true
});

export const pump = (id) => ({
  type: actions.PUMP,
  data: { id },
  key: "vacuum"
});

export const vent = (id) => ({
  type: actions.VENT,
  data: { id },
  key: "vacuum"
});

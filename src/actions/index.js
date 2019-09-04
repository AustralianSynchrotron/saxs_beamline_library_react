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
export const acquire = (filename, exp_times, num_images, delay, use_shutter, description) => ({
  type: actions.ACQUIRE,
  data: { filename, exp_times, num_images, delay, use_shutter, description },
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

export const listConfigs = () => ({
  type: actions.LISTCONFIGS,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/configs",
  data: {
    method: "GET",
    mode: "cors"
  }
});
export const getConfig = config => ({
  type: actions.GETCONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/config/" + config,
  data: {
    method: "GET",
    mode: "cors"
  }
});
export const newConfig = config_name => ({
  type: actions.NEWCONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/create",
  data: {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ config_name: config_name })
  }
});
export const getDefaultConfig = () => ({
  type: actions.DEFAULTCONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/default",
  data: {
    method: "GET",
    mode: "cors"
  }
});
export const reRead = () => ({
  type: actions.REREAD,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/read",
  data: {
    method: "GET",
    mode: "cors"
  }
});

export const reInitConfig = config_name => ({
  type: actions.REINITCONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/reinit",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name })
  }
});

export const storeConfig = config_name => ({
  type: actions.STORECONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/store",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name })
  }
});

export const updateConfig = config_name => ({
  type: actions.UPDATECONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/update",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name })
  }
});

export const restoreConfig = config_name => ({
  type: actions.RESTORECONFIG,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/restore",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name })
  }
});

export const configSetParameter = (config_name, key, value) => ({
  type: actions.CONFIGSETPARAM,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/config/parameter",
  data: {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ config_name, key, value })
  }
});

export const newDevice = (config_name, device) => ({
  type: actions.ADDDEVICE,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/config/device",
  data: {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ config_name, device })
  }
});

export const deleteDevice = (config_name, device) => ({
  type: actions.DELETEDEVICE,
  fetch: true,
  url: "http://10.138.11.39:8086/api/v1.0/config/device",
  data: {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ config_name, device })
  }
});

export const listenVacStatus = () => ({
  type: actions.LISTENVACSTATUS,
  key: "vacstatus"
});

export const updateVacStatus = (nosecone, chamber, beamline, vessel) => ({
  type: actions.VACSTATUS,
  data: { nosecone, chamber, beamline, vessel },
  fromServer: true
});

export const listenPressures = () => ({
  type: actions.LISTENPRESSURES,
  key: "vacstatus"
});

export const updatePressures = (nosecone, beamline, chamber, vessel) => ({
  type: actions.PRESSURES,
  data: { nosecone, beamline, chamber, vessel },
  fromServer: true
});

export const updateValves = (vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09) => ({
  type: actions.VALVES,
  data: { vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09 },
  fromServer: true
});

export const pump = name => ({
  type: actions.PUMP,
  data: { name },
  key: "vacuum"
});

export const vent = name => ({
  type: actions.VENT,
  data: { name },
  key: "vacuum"
});

export const manual_pump = (name, request) => ({
  type: actions.MANUALPUMP,
  data: { name, request },
  key: "vacuum"
});

export const manual_valve = (name, request) => ({
  type: actions.MANUALVALVE,
  data: { name, request },
  key: "vacuum"
});

export const start_listeners = () => ({
  type: actions.SUBSCRIBEVAC,
  key: "vacstatus"
});

export const vac_abort = () => ({
  type: actions.VACABORT,
  key: "vacuum"
});

export const subscribeOphyd = device => ({
  type: actions.SUBSCRIBEDEVICE,
  data: { device },
  key: "ophyd"
});

export const setOphyd = (device, value, timeout = null) => ({
  type: actions.SETDEVICE,
  data: { device, value, timeout },
  key: "ophyd"
});

export const getBundleList = (bundle, connected = false) => ({
  type: actions.GETBUNDLELIST,
  data: { bundle, connected },
  key: "ophyd"
});

export const tensileLength = length => ({
  type: actions.TENSLENGTH,
  data: { length },
  key: "tensile"
});

export const tensileWidth = width => ({
  type: actions.TENSWIDTH,
  data: { width },
  key: "tensile"
});

export const tensileThickness = thickness => ({
  type: actions.TENSTHICK,
  data: { thickness },
  key: "tensile"
});

export const tensileShape = shape => ({
  type: actions.TENSSHAPE,
  data: { shape },
  key: "tensile"
});

export const Hydrate = volume => ({
  type: actions.TENSHYDRATE,
  data: { volume },
  key: "tensile"
});

export const TensileAcquire = (
  filename,
  exposure_time,
  displacement_start,
  displacement_end,
  num_displacements,
  grid_start,
  grid_stop,
  grid_points,
  delay,
  hydration_vol
) => ({
  type: actions.TENSACQUIRE,
  data: {
    filename,
    exposure_time,
    displacement_start,
    displacement_end,
    num_displacements,
    grid_start,
    grid_stop,
    grid_points,
    delay,
    hydration_vol
  },
  key: "tensile"
});

export const updateTensileStatus = tensilestatus => ({
  type: actions.TENSSTATUS,
  data: { tensilestatus },
  fromServer: true
});

export const updateStrain = strain => ({
  type: actions.TENSSTRAIN,
  data: { strain },
  fromServer: true
});

export const updateStress = stress => ({
  type: actions.TENSSTRESS,
  data: { stress },
  fromServer: true
});

export const updateForce = force => ({
  type: actions.TENSFORCE,
  data: { force },
  fromServer: true
});

export const updateExtension = extension => ({
  type: actions.TENSEXTNION,
  data: { extension },
  fromServer: true
});

export const tensileAbort = () => ({
  type: actions.TENSABORT,
  key: "tensile"
});

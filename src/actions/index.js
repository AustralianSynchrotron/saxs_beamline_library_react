import * as actions from "./actionTypes";

const url = () => {
  return process.env.NODE_ENV === "production" ? "http://10.138.11.39" : "http://localhost";
};

// const beamlineConfigURL = "http://10.138.13.201:8080";
const ophydURL = "http://dockervip:4001";
const ophydWSURL = "ws://dockervip:4001";
const acquireURL = "http://dockervip:4002";
const feedbackURL = "http://dockervip:4003";
const cameraLengthURL = "http://dockervip:4004";
const flagsURL = "http://dockervip:4005";
const redisURL = "http://dockervip:4006";
const energyURL = "http://dockervip:4007";
const pumpingURL = "http://dockervip:4008";
const beamlineConfigURL = "http://dockervip:8086";

export const acquire = (filename, exp_times, num_images, delay, use_shutter, description) => ({
  type: actions.ACQUIRE,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "POST",
    body: JSON.stringify({ filename, exp_times, num_images, delay, use_shutter, description }),
  },
});
export const pause = () => ({
  type: actions.PAUSE,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "PUT",
    body: JSON.stringify({ run_state: "pause" }),
  },
});
export const resume = () => ({
  type: actions.RESUME,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "PUT",
    body: JSON.stringify({ run_state: "resume" }),
  },
});
export const stop = () => ({
  type: actions.STOP,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "PUT",
    body: JSON.stringify({ run_state: "stop" }),
  },
});
export const abort = () => ({
  type: actions.ABORT,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "PUT",
    body: JSON.stringify({ run_state: "abort" }),
  },
});
export const halt = () => ({
  type: actions.HALT,
  fetch: acquireURL + "/api/v1.0/acquire",
  data: {
    method: "PUT",
    body: JSON.stringify({ run_state: "halt" }),
  },
});
export const updateWell = (index, well) => ({
  type: actions.UPDATEWELL,
  data: { index, well },
  local: true,
});
export const selectAllWells = () => ({
  type: actions.SELECTALLWELLS,
  local: true,
});
export const unselectAllWells = () => ({
  type: actions.UNSELECTALLWELLS,
  local: true,
});
export const savePlate = (plate_name, sample_names, positions, washes, types) => ({
  type: actions.SAVEPLATE,
  data: { plate_name, sample_names, positions, washes, types },
});
export const loadPlate = (plate_name) => ({
  type: actions.LOADPLATE,
  data: { plate_name },
});
export const listPlates = () => ({
  type: actions.LISTPLATES,
});
export const runPlate = (plate_name, sample_names, positions, washes, types) => ({
  type: actions.RUNPLATE,
  data: { plate_name, sample_names, positions, washes, types },
});
export const updateStatus = (status) => ({
  type: actions.STATUS,
  data: { status },
});

export const listenStatus = () => ({
  type: actions.LISTENSTATUS,
  websocket: "status",
});

export const ophydConnected = (connected) => ({
  type: actions.OPHYDCONNECTED,
  data: { connected },
});

export const listConfigs = () => ({
  type: actions.LISTCONFIGS,
  fetch: beamlineConfigURL + "/api/v1.0/configs",
  data: {
    method: "GET",
    mode: "cors",
  },
});
export const getConfigPaths = () => ({
  type: actions.GETCONFIGPATHS,
  fetch: beamlineConfigURL + "/api/v1.0/paths",
  data: {
    method: "GET",
    mode: "cors",
  },
});
export const getConfig = (config) => ({
  type: actions.GETCONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/config/" + config,
  data: {
    method: "GET",
    mode: "cors",
  },
});
export const newConfig = (config_name, base_config_name, save_path) => ({
  type: actions.NEWCONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/create",
  data: {
    method: "PUT",
    body: JSON.stringify({ config_name, base_config_name, save_path }),
  },
});
export const reRead = () => ({
  type: actions.REREAD,
  fetch: beamlineConfigURL + "/api/v1.0/read",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const reInitConfig = (config_name) => ({
  type: actions.REINITCONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/reinit",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name }),
  },
});

export const storeConfig = (config_name) => ({
  type: actions.STORECONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/store",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name }),
  },
});

export const updateConfig = (config_name) => ({
  type: actions.UPDATECONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/update",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name }),
  },
});

export const restoreConfig = (config_name) => ({
  type: actions.RESTORECONFIG,
  fetch: beamlineConfigURL + "/api/v1.0/restore",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ config_name }),
  },
});

export const configSetParameter = (config_name, key, value) => ({
  type: actions.CONFIGSETPARAM,
  fetch: beamlineConfigURL + "/api/v1.0/config/parameter",
  data: {
    method: "PUT",
    body: JSON.stringify({ config_name, key, value }),
  },
});

export const newDevice = (config_name, device) => ({
  type: actions.ADDDEVICE,
  fetch: beamlineConfigURL + "/api/v1.0/config/device",
  data: {
    method: "PUT",
    body: JSON.stringify({ config_name, device }),
  },
});

export const deleteDevice = (config_name, device) => ({
  type: actions.DELETEDEVICE,
  fetch: beamlineConfigURL + "/api/v1.0/config/device",
  data: {
    method: "DELETE",
    body: JSON.stringify({ config_name, device }),
  },
});

export const listenVacStatus = () => ({
  type: actions.LISTENVACSTATUS,
  websocket: "vacstatus",
});

export const updateVacStatus = (nosecone, chamber, beamline, vessel) => ({
  type: actions.VACSTATUS,
  data: { nosecone, chamber, beamline, vessel },
});

export const listenPressures = () => ({
  type: actions.LISTENPRESSURES,
  websocket: "vacstatus",
});

export const updatePressures = (nosecone, beamline, chamber, vessel) => ({
  type: actions.PRESSURES,
  data: { nosecone, beamline, chamber, vessel },
});

export const updateValves = (vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09) => ({
  type: actions.VALVES,
  data: { vlv07, vlv10, vlv11, vlv12, igv06, igv08, igv09 },
});

export const pump = (name) => ({
  type: actions.PUMP,
  fetch: pumpingURL + "/api/v1.0/pump",
  data: {
    method: "POST",
    body: JSON.stringify({ section: name + "_pump" }),
  },
});

export const vent = (name) => ({
  type: actions.VENT,
  fetch: pumpingURL + "/api/v1.0/pump",
  data: {
    method: "POST",
    body: JSON.stringify({ section: name + "_vent" }),
  },
});

export const manual_pump = (name, request) => ({
  type: actions.MANUALPUMP,
  data: { name, request },
  websocket: "vacuum",
});

export const manual_valve = (name, request) => ({
  type: actions.MANUALVALVE,
  data: { name, request },
  websocket: "vacuum",
});

export const start_listeners = () => ({
  type: actions.SUBSCRIBEVAC,
  websocket: "vacstatus",
});

export const vac_abort = () => ({
  type: actions.VACABORT,
  fetch: pumpingURL + "/api/v1.0/pump",
  data: {
    method: "DELETE",
  },
});

export const subscribeOphyd = (token) => ({
  type: actions.SUBSCRIBEOPHYD,
  fetch: ophydURL + "/api/v1.0/subscriptions",
  data: {
    method: "POST",
    body: JSON.stringify({ token }),
  },
});

export const connectOphyd = (token) => ({
  type: actions.CONNECTOPHYD,
  websocketConnect: true,
  data: {
    endPoints: {
      urls: { ophyd: ophydWSURL + "/api/v1.0/subscriptions/" + token + "/ws" },
      onOpenDispatch: {
        status: listenStatus,
        ophyd: () => ophydConnected(true),
      },
      onCloseDispatch: {
        ophyd: () => ophydConnected(false),
      },
    },
  },
});

export const subscribeOphydDevice = (token, devices) => ({
  type: actions.SUBSCRIBEDEVICE,
  fetch: ophydURL + "/api/v1.0/subscriptions/" + token,
  data: {
    method: "PUT",
    body: JSON.stringify({ devices: devices }),
  },
});

export const getOphyd = (device, describe = false) => {
  var url = new URL(ophydURL + "/api/v1.0/devices/" + device);
  var params = { describe };
  url.search = new URLSearchParams(params).toString();
  return {
    type: actions.GETDEVICE,
    fetch: url,
    data: {
      method: "GET",
    },
  };
};

export const setOphyd = (device, value, timeout = null) => {
  var body = { value: value };
  if (timeout !== null) {
    body.timeout = timeout;
  }
  return {
    type: actions.SETDEVICE,
    fetch: ophydURL + "/api/v1.0/devices/" + device,
    data: {
      method: "PUT",
      body: JSON.stringify(body),
    },
  };
};

export const getBundleList = (bundle) => ({
  type: actions.GETBUNDLELIST,
  fetch: ophydURL + "/api/v1.0/bundles/" + bundle,
  data: {
    method: "GET",
    bundle: bundle,
  },
});

export const tensileLength = (length) => ({
  type: actions.TENSLENGTH,
  data: { length },
  websocket: "tensile",
});

export const tensileWidth = (width) => ({
  type: actions.TENSWIDTH,
  data: { width },
  websocket: "tensile",
});

export const tensileThickness = (thickness) => ({
  type: actions.TENSTHICK,
  data: { thickness },
  websocket: "tensile",
});

export const tensileShape = (shape) => ({
  type: actions.TENSSHAPE,
  data: { shape },
  websocket: "tensile",
});

export const Hydrate = (volume) => ({
  type: actions.TENSHYDRATE,
  data: { volume },
  websocket: "tensile",
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
    hydration_vol,
  },
  websocket: "tensile",
});

export const updateTensileStatus = (tensilestatus) => ({
  type: actions.TENSSTATUS,
  data: { tensilestatus },
});

export const updateStrain = (strain) => ({
  type: actions.TENSSTRAIN,
  data: { strain },
});

export const updateStress = (stress) => ({
  type: actions.TENSSTRESS,
  data: { stress },
});

export const updateForce = (force) => ({
  type: actions.TENSFORCE,
  data: { force },
});

export const updateExtension = (extension) => ({
  type: actions.TENSEXTNION,
  data: { extension },
});

export const tensileAbort = () => ({
  type: actions.TENSABORT,
  websocket: "tensile",
});

export const clearSetError = () => ({
  type: actions.CLEARSETERROR,
});

export const listenLogger = () => ({
  type: actions.LISTENLOGGER,
  websocket: "logger",
});

export const subscribeDocker = () => ({
  type: actions.SUBSCRIBEDOCKER,
  websocket: "docker",
});

export const setDocker = (cmd) => ({
  type: actions.SETDOCKER,
  data: { cmd },
  websocket: "docker",
});

export const listenGrazing = () => ({
  type: actions.LISTENGRAZING,
  websocket: "grazing",
});

export const updateGSParam = (loopNum, posNum, param, value) => ({
  type: actions.UPDATE_GS_POSITIONER,
  data: { loopNum, posNum, param, value },
});

export const addGSPositioner = (loopNum) => ({
  type: actions.ADD_GS_POSITIONER,
  data: { loopNum },
});

export const removeGSPositioner = (loopNum, posNum) => ({
  type: actions.REMOVE_GS_POSITIONER,
  data: { loopNum, posNum },
});

export const addGSLoop = () => ({
  type: actions.ADD_GS_LOOP,
});

export const removeGSLoop = (loopNum) => ({
  type: actions.REMOVE_GS_LOOP,
  data: { loopNum },
});

export const runGSScan = () => ({
  type: actions.RUN_GS_SCAN,
  fetch: url() + ":4040/api/v1.0/scan",
  store: { generic_scan: ["genericScan"] },
  data: {
    method: "PUT",
  },
});

export const saveGSScan = (name) => ({
  type: actions.SAVE_GS_SCAN,
  fetch: url() + ":4040/api/v1.0/store",
  store: { generic_scan: ["genericScan"] },
  data: {
    method: "PUT",
    body: JSON.stringify({ name }),
  },
});

export const loadGSScan = (name) => ({
  type: actions.LOAD_GS_SCAN,
  fetch: url() + ":4040/api/v1.0/load/" + name,
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const listGSScan = () => ({
  type: actions.LIST_GS_SCAN,
  fetch: url() + ":4040/api/v1.0/list",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const clearFeedbackLog = () => ({
  type: actions.CLEARFEEDBACKLOG,
})

export const doFeedback = () => ({
  type: actions.DOFEEDBACK,
  fetch: feedbackURL + "/api/v1.0/feedback",
  data: {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({}),
  },
});

export const stopFeedback = () => ({
  type: actions.STOPFEEDBACK,
  fetch: feedbackURL + "/api/v1.0/feedback",
  data: {
    method: "DELETE",
    mode: "cors",
  },
});

export const feedbackIn = () => ({
  type: actions.FEEDBACKIN,
  fetch: feedbackURL + "/api/v1.0/feedbackin",
  data: {
    method: "POST",
    mode: "cors",
  },
});

export const feedbackOut = () => ({
  type: actions.FEEDBACKOUT,
  fetch: feedbackURL + "/api/v1.0/feedbackout",
  data: {
    method: "POST",
    mode: "cors",
  },
});

export const listNoseCones = () => ({
  type: actions.NOSECONES,
  fetch: cameraLengthURL + "/api/v1.0/nosecones",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const noseCone = () => ({
  type: actions.NOSECONE,
  fetch: cameraLengthURL + "/api/v1.0/nosecone",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const changeNoseCone = (name) => ({
  type: actions.NOSECONE,
  fetch: cameraLengthURL + "/api/v1.0/nosecone",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ name }),
  },
});

export const getUserOffset = () => ({
  type: actions.USEROFFSET,
  fetch: cameraLengthURL + "/api/v1.0/useroffset",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const changeUserOffset = (user) => ({
  type: actions.USEROFFSET,
  fetch: cameraLengthURL + "/api/v1.0/nosecone",
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ user }),
  },
});

export const getCameraLength = () => ({
  type: actions.CAMERALENGTH,
  fetch: cameraLengthURL + "/api/v1.0/cameralength",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const changeCameraLength = (length) => ({
  type: actions.CAMERALENGTH,
  fetch: cameraLengthURL + "/api/v1.0/cameralength",
  data: {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ length }),
  },
});

export const changeEnergy = (energy) => ({
  type: actions.ENERGYCHANGE,
  fetch: energyURL + "/api/v1.0/energychange",
  data: {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ energy }),
  },
});

export const clearProgressLog = () => ({
  type: actions.CLEARPROGRESSLOG,
});

export const buttonStatus = (buttons) => ({
  type: actions.GAMEPAD_BUTTON_STATUS,
  data: { buttons },
});

export const getFlags = () => ({
  type: actions.GETFLAGS,
  fetch: flagsURL + "/api/v1.0/flags",
  data: {
    method: "GET",
    mode: "cors",
  },
});

export const setFlag = (key, value) => ({
  type: actions.SETFLAG,
  fetch: flagsURL + "/api/v1.0/flags/" + key,
  data: {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify({ value }),
  },
});
export const getKVs = () => ({
  type: actions.GETKVS,
  fetch: redisURL + "/api/v1.0/kvs",
  data: {
    method: "GET",
    mode: "cors",
  },
});

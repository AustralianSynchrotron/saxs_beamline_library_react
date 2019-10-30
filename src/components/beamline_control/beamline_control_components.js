import React, { Component, useEffect, useState } from "react";
import { makeStyles, getThemeProps } from "@material-ui/styles";
import clsx from "clsx";
import {
  OphydMotorCompact,
  OphydSlider,
  OphydMotorBundleCompact,
  OphydStatusField,
  OphydTextField,
  OphydToggleButton,
  OphydButton,
  OphydDropdown,
  OphydStateIcon
} from "../ophyd_components/ophyd_components";

import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles({
  hidden: { display: "None" },
  showButton: { marginTop: 0 },
  slider: { flexDirection: "row" },
  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "red" //default
    }
  },
  second: {
    background: green[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  first: {
    background: red[500],
    color: "white",
    height: 48,
    "&:hover": {
      backgroundColor: red["A700"]
    }
  },

  notchedOutline: {},
  error: {},
  disabled: {},
  horizontal: {
    display: "flex",
    flexDireciton: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  vertical: {
    display: "flex",
    flexDireciton: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  statusfield: {
    padding: "2px",
    background: grey["900"]
  },

  padding: {
    padding: "1px"
  },

  horizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    padding: "10px"
  }
});

export const Energy = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Energy</Typography>
          <div className={clsx(classes.horizontal, classes.padding)}>
            <OphydTextField device="saxs_optics.dcm.set_energy" label="Set Energy" />
            <OphydStatusField
              device="saxs_optics.dcm.energy"
              label="Energy"
              toNumber={true}
              precision={3}
              suffix="keV"
            />
            <OphydStatusField
              device="saxs_optics.dcm.wavelength"
              label="Wavelength"
              toNumber={true}
              precision={3}
              suffix="nm"
            />
            <OphydStateIcon
              device="saxs_optics.dcm.echange_ivu_dcm_complete"
              label=" DCM moved?"
              good_value={1}
            />
            <OphydStateIcon
              device="saxs_optics.dcm.dcm_fine_scan_state"
              good_value={0}
              label="Scan Done?"
            />
            <OphydStatusField
              device="saxs_optics.dcm.scan_pt"
              label="DCM Tune pt"
              toNumber={true}
              precision={3}
              undef_val={0}
            />
            <OphydStatusField
              device="saxs_optics.dcm.scan_pts"
              label="of"
              toNumber={true}
              precision={3}
              undef_val={0}
            />
            <OphydStateIcon
              device="saxs_optics.dcm.echange_fb_image_tune"
              good_value={1}
              label="Feedback?"
            />
            <OphydStatusField
              device="EPICS_status_devices.epics_status.energy_change_message"
              label="Energy Change Status"
              printVal={true}
            />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const Flux = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Flux</Typography>
          <div className={classes.horizontal}>
            <OphydDropdown label="Camera Length" device="saxs_slits.flux.camera_length" />
            <OphydToggleButton
              label="Flux Scale"
              labelPosition="left"
              labelFirst="High Flux"
              labelSecond="Medium/Protein"
              valueFirst={0}
              valueSecond={1}
              readFirst={0}
              readSecond={1}
              device={"saxs_slits.flux.flux_level"}
              classes={classes}
            />
            <OphydTextField device="saxs_slits.flux.percent_flux" precision={3} />
            <OphydSlider
              device="saxs_slits.flux.percent_flux"
              step={0.1}
              min={0}
              max={100}
              label="% Flux"
              leftIcon={<BrightnessLow />}
              rightIcon={<BrightnessHigh />}
            />
            <OphydButton label="Ludicrous Flux" device="saxs_slits.flux.ludicrous" value={1} />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const SampleLights = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Sample Lights</Typography>
        </div>
        <div>
          <OphydSlider
            device="saxs_IO.rio0.ao_0"
            step={0.1}
            min={0}
            max={10}
            label="Light One"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
          <OphydSlider
            device="saxs_IO.rio0.ao_1"
            step={0.1}
            min={0}
            max={10}
            label="Light Two"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const CameraControls = props => {
  const classes = useStyles(props);
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Camera Exposure and Gain</Typography>
        </div>
        <div className={classes.horizontal}>
          <OphydSlider
            device="saxs_video.video_cameras.video_camera_1.cam.acquire_time"
            step={0.01}
            min={0}
            max={2}
            label="Sample Exp Time"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
          <OphydSlider
            device="saxs_video.video_cameras.video_camera_1.cam.gain"
            step={0.1}
            min={0}
            max={40}
            label="Sample Gain"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
        </div>
        <div className={classes.horizontal}>
          <OphydSlider
            device="saxs_video.video_cameras.video_camera_6.cam.acquire_time"
            step={0.01}
            min={0}
            max={2}
            label="Wide Exp Time"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
          <OphydSlider
            device="saxs_video.video_cameras.video_camera_6.cam.gain"
            step={0.1}
            min={0}
            max={40}
            label="Wide Gain"
            leftIcon={<BrightnessLow />}
            rightIcon={<BrightnessHigh />}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
};

export const WindowControls = props => {
  const classes = useStyles(props);
  const [TweakYValue, setTweakYValue] = useState("0.1");
  const handleChangeY = event => {
    setTweakYValue(event.target.value);
  };
  const [TweakXValue, setTweakXValue] = useState("0.1");
  const handleChangeX = event => {
    setTweakXValue(event.target.value);
  };
  return (
    <React.Fragment>
      <Paper>
        <div className={classes.padding}>
          <Typography variant="h5">Move Window</Typography>
          <Typography variant="body">Only moves relative by the tweak value</Typography>
        </div>
        <div className={classes.horizontal}>
          <div className={classes.horizontal}>
            <OphydButton label="Move Window UP" device="move_window.wy.move" value={TweakYValue} />

            <TextField
              label="Tweak Value"
              variant="outlined"
              value={TweakYValue}
              onChange={handleChangeY}
            />
            <OphydButton
              label="Move Window Down"
              device="move_window.wy.move"
              value={-1 * TweakYValue}
            />
          </div>
          <div className={classes.horizontal}>
            <OphydButton
              label="Move Window outboard"
              device="move_window.wx.move"
              value={TweakXValue}
            />
            <TextField
              label="Tweak Value"
              variant="outlined"
              value={TweakXValue}
              onChange={handleChangeX}
            />
            <OphydButton
              label="Move Window inboard"
              device="move_window.wx.move"
              value={-1 * TweakXValue}
            />
          </div>
        </div>
      </Paper>
    </React.Fragment>
  );
};

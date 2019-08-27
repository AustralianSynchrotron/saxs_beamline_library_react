import React from "react";
import { makeStyles } from "@material-ui/styles";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import BrightnessHigh from "@material-ui/icons/BrightnessHigh";
import ShutterSpeed from "@material-ui/icons/ShutterSpeed";
import ShutterSpeedTwoTone from "@material-ui/icons/ShutterSpeedTwoTone";
import {
  OphydButton,
  OphydSlider,
  OphydTextField,
  OphydStatusField
} from "../ophyd_components/ophyd_components";

const useStyles = makeStyles({
  start: {
    background: "green",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  stop: {
    background: "red",
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

const CameraControl = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <OphydButton
        label="Start"
        device={props.cam + ".cam.acquire"}
        value={1}
        classes={classes.start}
      />
      <OphydButton
        label="Stop"
        device={props.cam + ".cam.acquire"}
        value={0}
        classes={classes.stop}
      />
      <OphydSlider
        device={props.cam + ".cam.gain"}
        step={0.1}
        min={0}
        max={10}
        leftIcon={<BrightnessLow />}
        rightIcon={<BrightnessHigh />}
      />
      <OphydSlider
        device={props.cam + ".cam.acquire_time"}
        step={0.1}
        min={0}
        max={10}
        leftIcon={<ShutterSpeed />}
        rightIcon={<ShutterSpeedTwoTone />}
      />
      <OphydButton label="Restart Server" />
      <OphydStatusField label="Server Status" />
    </React.Fragment>
  );
};
export default CameraControl;
